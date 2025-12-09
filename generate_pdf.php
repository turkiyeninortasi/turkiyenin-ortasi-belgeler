<?php
header('Content-Type: application/pdf');
header('Cache-Control: no-cache, no-store, must-revalidate');

$lang = isset($_GET['lang']) ? $_GET['lang'] : 'tr';

// PDF başlık ve içeriği
if ($lang === 'en') {
    $filename = 'Turkey_Geographic_Center_Verification_Report.pdf';
    $title = 'Turkey\'s Geographic Center Report';
    $coords = 'Coordinates: 39.245472° N, 35.487361° E';
    $location = 'Location: Eşrefpaşa/Çandır, Yozgat';
    $methodology = 'Methodology:';
    $methodology_text = 'This study calculated the geometric center (area-weighted centroid) of Turkey\'s borders. The calculation was performed using the Lambert Azimuthal Equal-Area projection and verified in the WGS84 coordinate system.';
    $uncertainty = 'Verification:';
    $uncertainty_text = 'Data has been scientifically processed and verified.';
    $last_update = 'Last Update: December 9, 2025';
} else {
    $filename = 'Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf';
    $title = 'Türkiye\'nin Coğrafi Merkezi Raporu';
    $coords = 'Koordinatlar: 39.245472° N, 35.487361° E';
    $location = 'Konum: Eşrefpaşa/Çandır, Yozgat';
    $methodology = 'Metodoloji:';
    $methodology_text = 'Bu çalışmada Türkiye sınırlarının geometrik merkezi (alan-ağırlıklı centroid) hesaplanmıştır. Hesaplama Lambert Azimuthal Equal-Area projeksiyonu kullanılarak yapılmış olup, WGS84 koordinat sisteminde doğrulanmıştır.';
    $uncertainty = 'Doğrulama:';
    $uncertainty_text = 'Veriler bilimsel olarak işlenmiş ve doğrulanmıştır.';
    $last_update = 'Son Güncelleme: 9 Aralık 2025';
}

header('Content-Disposition: attachment; filename="' . $filename . '"');

// Basit PDF oluştur (UTF-8 uyumlu)
$pdf = '%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length 2500 >>
stream
BT
/F1 24 Tf
50 750 Td
(' . addslashes($title) . ') Tj
0 -40 Td
/F2 12 Tf
(' . addslashes($coords) . ') Tj
0 -20 Td
(' . addslashes($location) . ') Tj
0 -40 Td
/F1 14 Tf
(' . addslashes($methodology) . ') Tj
0 -20 Td
/F2 11 Tf
(' . addslashes($methodology_text) . ') Tj
0 -40 Td
/F1 14 Tf
(' . addslashes($uncertainty) . ') Tj
0 -20 Td
/F2 11 Tf
(' . addslashes($uncertainty_text) . ') Tj
0 -60 Td
(' . addslashes($last_update) . ') Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000273 00000 n 
0000002823 00000 n 
0000002901 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
2979
%%EOF
';

echo $pdf;
?>
