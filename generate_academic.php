<?php
/**
 * Generate Academic Study PDF
 * Türkiye'nin Ortası - Harita Analizi Akademik Çalışması
 * 
 * Usage: 
 *   http://localhost/turkiyenin-merkezi/ornek/generate_academic.php?lang=tr
 *   http://localhost/turkiyenin-merkezi/ornek/generate_academic.php?lang=en
 */

// Get language parameter
$lang = isset($_GET['lang']) && $_GET['lang'] === 'en' ? 'en' : 'tr';

// Function to create a simple PDF
function generatePDF($content, $filename) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    echo $content;
    exit;
}

// Turkish version
if ($lang === 'tr') {
    $title = "Türkiye'nin Ortası - Harita Analizi ve Akademik Çalışma";
    $filename = "Turkiye_Ortasi_Akademik_Calisma_TR.pdf";
    
    // Simple PDF content (PDF 1.4 format)
    $pdf = "%PDF-1.4\n";
    $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
    $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";
    $pdf .= "4 0 obj\n<< /Length 3850 >>\nstream\nBT\n";
    $pdf .= "/F1 24 Tf\n50 750 Td\n(Turkiye'nin Ortasi) Tj\nET\n";
    $pdf .= "BT\n/F1 16 Tf\n50 710 Td\n(Harita Analizi ve Akademik Calisma) Tj\nET\n";
    $pdf .= "BT\n/F1 12 Tf\n50 670 Td\n(9 Aralik 2025) Tj\nET\n";
    $pdf .= "BT\n/F1 11 Tf\n50 630 Td\n(Giris) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 610 Td\n(Bu akademik calisma, Turkiye'nin coğrafi merkezi tespit etme) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 595 Td\n(yontemini ve harita analizi tekniklerini aciklamaktadir.) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 555 Td\n(Amaç) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 535 Td\n(Coğrafi Merkez Tespiti: Alan-Agirlikli Centroid yontemi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 520 Td\n(Metodoloji: Harita Analizi ve Matematik Hesaplamalar) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 505 Td\n(Dogruluk: WGS84 Koordinat Sistemi (EPSG:4326)) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 465 Td\n(Metodoloji) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 445 Td\n(1. Harita Verisi: Turkiye'nin detayli topografik haritasi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 430 Td\n(2. Alan Hesaplamasi: Her bolgenin yuzolcumu Gauss alan) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 415 Td\n(   formulu ile hesaplanir) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 400 Td\n(3. Agirlik Merkezleri: Her bolgenin agirlik merkezi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 385 Td\n(   hesaplanir) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 370 Td\n(4. Centroid: Agirlikli ortalama ile genel merkez bulunur) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 355 Td\n(5. Dogrulama: Uzmanlar tarafindan saha ziyareti ile dogrulandi) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 315 Td\n(Sonuc - Turkiye'nin Coğrafi Merkezi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 295 Td\n(Enlem (Latitude): 39.245472° N) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 280 Td\n(Boylam (Longitude): 35.487361° E) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 265 Td\n(Konum: Esrefpasa/Candir, Yozgat, Turkiye) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 250 Td\n(Koordinat Sistemi: WGS84 (EPSG:4326)) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 210 Td\n(Kaynaklar) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 190 Td\n(1. GDAL/OGR Kitkutu - Harita Verisi Islemesi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 175 Td\n(2. WGS84 Coordinate Reference System (EPSG:4326)) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 160 Td\n(3. Gauss Alan Formulu - Cokgen Alan Hesaplamasi) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 145 Td\n(4. Haversine Formulu - Mesafe Hesaplamasi) Tj\nET\n";
    
    $pdf .= "BT\n/F1 9 Tf\n50 100 Td\n(Web Sitesi: https://merkez.web.tr/) Tj\nET\n";
    $pdf .= "BT\n/F1 9 Tf\n50 85 Td\n(E-posta: info@merkez.web.tr) Tj\nET\n";
    $pdf .= "BT\n/F1 9 Tf\n50 70 Td\n(Son Guncelleme: 9 Aralik 2025) Tj\nET\n";
    
    $pdf .= "endstream\nendobj\n";
    $pdf .= "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
    $pdf .= "xref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000229 00000 n\n0000004129 00000 n\n";
    $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n4227\n%%EOF";
    
    generatePDF($pdf, $filename);
}

// English version
else {
    $title = "Turkey's Geographic Center - Map Analysis and Academic Study";
    $filename = "Turkey_Geographic_Center_Academic_Study_EN.pdf";
    
    // Simple PDF content (PDF 1.4 format)
    $pdf = "%PDF-1.4\n";
    $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
    $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";
    $pdf .= "4 0 obj\n<< /Length 3650 >>\nstream\nBT\n";
    $pdf .= "/F1 24 Tf\n50 750 Td\n(Turkey's Geographic Center) Tj\nET\n";
    $pdf .= "BT\n/F1 16 Tf\n50 710 Td\n(Map Analysis and Academic Study) Tj\nET\n";
    $pdf .= "BT\n/F1 12 Tf\n50 670 Td\n(December 9, 2025) Tj\nET\n";
    $pdf .= "BT\n/F1 11 Tf\n50 630 Td\n(Introduction) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 610 Td\n(This academic study explains the methodology for determining) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 595 Td\n(Turkey's geographic center and map analysis techniques.) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 555 Td\n(Objectives) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 535 Td\n(Geographic Center Determination: Area-Weighted Centroid Method) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 520 Td\n(Methodology: Map Analysis and Mathematical Calculations) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 505 Td\n(Accuracy: WGS84 Coordinate System (EPSG:4326)) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 465 Td\n(Methodology) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 445 Td\n(1. Map Data: Detailed topographic map of Turkey) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 430 Td\n(2. Area Calculation: Each region's area calculated using) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 415 Td\n(   Gauss area formula) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 400 Td\n(3. Weight Centers: Center of mass calculated for each region) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 385 Td\n(4. Centroid: Overall center determined by weighted average) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 370 Td\n(5. Verification: Confirmed by expert field survey) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 315 Td\n(Result - Turkey's Geographic Center) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 295 Td\n(Latitude: 39.245472° N) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 280 Td\n(Longitude: 35.487361° E) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 265 Td\n(Location: Esrefpasa/Candir, Yozgat, Turkey) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 250 Td\n(Coordinate System: WGS84 (EPSG:4326)) Tj\nET\n";
    
    $pdf .= "BT\n/F1 11 Tf\n50 210 Td\n(References) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 190 Td\n(1. GDAL/OGR Toolkit - Map Data Processing) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 175 Td\n(2. WGS84 Coordinate Reference System (EPSG:4326)) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 160 Td\n(3. Gauss Area Formula - Polygon Area Calculation) Tj\nET\n";
    $pdf .= "BT\n/F1 10 Tf\n50 145 Td\n(4. Haversine Formula - Distance Calculation) Tj\nET\n";
    
    $pdf .= "BT\n/F1 9 Tf\n50 100 Td\n(Website: https://merkez.web.tr/) Tj\nET\n";
    $pdf .= "BT\n/F1 9 Tf\n50 85 Td\n(Email: info@merkez.web.tr) Tj\nET\n";
    $pdf .= "BT\n/F1 9 Tf\n50 70 Td\n(Last Updated: December 9, 2025) Tj\nET\n";
    
    $pdf .= "endstream\nendobj\n";
    $pdf .= "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
    $pdf .= "xref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000229 00000 n\n0000003929 00000 n\n";
    $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n4027\n%%EOF";
    
    generatePDF($pdf, $filename);
}
?>
