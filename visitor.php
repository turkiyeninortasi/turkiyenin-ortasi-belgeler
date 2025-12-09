<?php
// Simple visitor counter endpoint for PHP hosting (visitor.php)
// POST -> increment (expects JSON body)
// GET?action=stats -> returns JSON stats { total, today, last_updated }

header('Content-Type: application/json; charset=utf-8');

$DATA_FILE = __DIR__ . '/visitors.json';

// initialize file if missing
if (!file_exists($DATA_FILE)) {
    $initial = [
        'total' => 0,
        'today' => 0,
        'last_update' => '',
        'events' => []
    ];
    file_put_contents($DATA_FILE, json_encode($initial, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// helper: load
function load_data($file) {
    $content = @file_get_contents($file);
    if (!$content) return ['total'=>0,'today'=>0,'last_update'=>'','events'=>[]];
    $d = json_decode($content, true);
    if (!$d) return ['total'=>0,'today'=>0,'last_update'=>'','events'=>[]];
    return $d;
}

// helper: save with lock
function save_data($file, $data) {
    $tmp = $file . '.tmp';
    file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    rename($tmp, $file);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    if ($action === 'stats') {
        $d = load_data($DATA_FILE);
        echo json_encode([ 'total' => intval($d['total'] ?? 0), 'today' => intval($d['today'] ?? 0), 'last_updated' => ($d['last_update'] ?? 'never') ]);
        exit;
    }
    // default: show a small info
    echo json_encode(['status'=>'ok','message'=>'Visitor endpoint active']);
    exit;
}

if ($method === 'POST') {
    // read body
    $body = file_get_contents('php://input');
    $json = @json_decode($body, true);
    $event = $json['event'] ?? 'page_view';
    $path = $json['path'] ?? ($_SERVER['REQUEST_URI'] ?? '/');

    // load, update, save
    $data = load_data($DATA_FILE);

    $data['total'] = intval($data['total'] ?? 0) + 1;
    $today = date('Y-m-d');
    if (($data['last_update'] ?? '') !== $today) {
        $data['today'] = 1;
        $data['last_update'] = $today;
    } else {
        $data['today'] = intval($data['today'] ?? 0) + 1;
    }

    if (!isset($data['events']) || !is_array($data['events'])) $data['events'] = [];
    $data['events'][] = [
        'timestamp' => date('c'),
        'event' => $event,
        'path' => $path,
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];
    // keep last 1000
    if (count($data['events']) > 1000) $data['events'] = array_slice($data['events'], -1000);

    // save
    save_data($DATA_FILE, $data);

    echo json_encode([ 'status' => 'ok', 'total' => intval($data['total']), 'today' => intval($data['today']) ]);
    exit;
}

http_response_code(405);
echo json_encode(['status'=>'error','message'=>'Method not allowed']);

?>
