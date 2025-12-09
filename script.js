// Merkez koordinatları (Türkiye'nin coğrafi merkezi)
const centerLat = 39.245472;
const centerLon = 35.487361;

// Global erişim için window objesine ekle
window.centerLat = centerLat;
window.centerLon = centerLon;

// Ana başlatıcı: Tüm sayfa yükleme ve i18n işlemleri tek bir yerde
document.addEventListener('DOMContentLoaded', function() {
    // Haritayı başlat
    initMap();
    // Navigasyon menüsü toggle işlemi
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    // Yumuşak kaydırma için tüm bağlantıları seç
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
    // i18n ve dil işlemleri
    const saved = localStorage.getItem('lang');
    const defaultLang = saved || ((navigator.language && navigator.language.startsWith('en')) ? 'en' : 'tr');
    addFallbackI18nMarkers();
    loadLanguage(defaultLang);
    const btn = document.getElementById('langToggle');
    if (btn) {
        const menu = document.getElementById('langMenu');
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!menu) {
                const current = localStorage.getItem('lang') || defaultLang;
                const next = current === 'tr' ? 'en' : 'tr';
                loadLanguage(next);
                return;
            }
            menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
        });
        document.addEventListener('click', function() { if (menu) menu.style.display = 'none'; });
        if (menu) {
            menu.innerHTML = '';
            const scripts = document.querySelectorAll('script[id^="i18n-"]');
            scripts.forEach(s => {
                const id = s.id;
                const lang = id.split('-')[1] || id;
                let label = lang.toUpperCase();
                try {
                    const obj = JSON.parse(s.textContent);
                    if (obj && obj.nav && obj.nav.title) label = obj.nav.title + ` (${lang.toUpperCase()})`;
                } catch (e) {}
                const b = document.createElement('button');
                b.className = 'btn';
                b.setAttribute('data-lang', lang);
                b.textContent = label;
                b.addEventListener('click', function(e) {
                    e.stopPropagation();
                    loadLanguage(lang);
                    menu.style.display = 'none';
                });
                menu.appendChild(b);
            });
        }
        btn.style.cursor = 'pointer';
        btn.setAttribute('role', 'button');
    }
});

// Haritayı başlatma fonksiyonu
function initMap() {
    // Harita zaten başlatıldıysa devam etme
    if (window.mapInitialized) return;
    
    // Harita konteynerini kontrol et
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Harita boyutlarını ayarla
    mapElement.style.height = '500px';
    
    // Haritayı oluştur
    const map = L.map('map').setView([39.245472, 35.487361], 6);
    
    // OpenStreetMap katmanını ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Türkiye'nin merkez noktasına işaretçi ekle
    const centerMarker = L.marker([39.245472, 35.487361], {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '<i class="fas fa-map-pin"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        })
    }).addTo(map);
    
    centerMarker.bindPopup(`
        <div class="marker-popup">
            <h3>Türkiye'nin Coğrafi Merkezi</h3>
            <p>Eşrefpaşa/Çandır, Yozgat</p>
            <p>Koordinat: 39.245472° N, 35.487361° E</p>
        </div>
    `).openPopup();
    
    // Harita kontrollerini ekle
    L.control.scale({ imperial: false }).addTo(map);
    
    // Harita başlatıldı olarak işaretle
    window.mapInitialized = true;
    window.map = map; // Global erişim için
}

// Navigasyon menüsünde aktif bölümü vurgulama
function highlightNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Tüm bağlantılardan active sınıfını kaldır
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // İlgili bağlantıya active sınıfını ekle
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Koordinatları panoya kopyalama
function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            const msg = getNested(window.translations, 'messages.coordCopied') || 'Koordinat panoya kopyalandı';
            showNotification(msg, 'success');
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
            const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
            showNotification(msg, 'error');
        }
        document.body.removeChild(textarea);
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const msg = getNested(window.translations, 'messages.coordCopied') || 'Koordinat panoya kopyalandı';
        showNotification(msg, 'success');
    }).catch(err => {
        console.error('Kopyalama başarısız:', err);
        const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
        showNotification(msg, 'error');
    });
}

// Mevcut enlemi al
function getCurrentLat() {
    return '39.245472';
}

// Mevcut boylamı al
function getCurrentLon() {
    return '35.487361';
}

// Haritayı merkeze yakınlaştır
function zoomToCenter() {
    if (window.map) {
        window.map.setView([39.245472, 35.487361], 8);
        const msg = getNested(window.translations, 'messages.zoomCenter') || 'Harita merkeze yakınlaştırıldı';
        showNotification(msg, 'info');
    }
}

// Tüm Türkiye'yi gösterme
function showFullTurkey() {
    if (window.map) {
        window.map.setView([39.0, 35.0], 6);
        const msg = getNested(window.translations, 'messages.showingTurkey') || 'Tüm Türkiye görüntüleniyor';
        showNotification(msg, 'info');
    }
}

// Harita ekran görüntüsü al ve indir (html2canvas kullanır)
function mapScreenshot() {
    const mapEl = document.getElementById('map');
    if (!mapEl) {
        const msg = getNested(window.translations, 'messages.error') || 'Harita bulunamadı';
        showNotification(msg, 'error');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        const msg = getNested(window.translations, 'messages.error') || 'Ekran görüntüsü aracı yüklenemedi';
        showNotification(msg, 'error');
        return;
    }

    const msg1 = getNested(window.translations, 'messages.downloadingMap') || 'Harita görüntüsü oluşturuluyor...';
    showNotification(msg1, 'info');

    // html2canvas ile haritayı yakala
    html2canvas(mapEl, { useCORS: true, logging: false, backgroundColor: null }).then(canvas => {
        try {
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            const now = new Date();
            const name = `turkiye_merkezi_map_${now.toISOString().slice(0,19).replace(/[:T]/g,'-')}.png`;
            a.href = dataUrl;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            const msg2 = getNested(window.translations, 'messages.downloadingMap') || 'Harita görüntüsü indiriliyor...';
            showNotification(msg2, 'success');
        } catch (err) {
            console.error('Harita indirme hatası', err);
            const msg3 = getNested(window.translations, 'messages.error') || 'Harita görüntüsü indirilemedi';
            showNotification(msg3, 'error');
        }
    }).catch(err => {
        console.error('html2canvas hata', err);
        const msg4 = getNested(window.translations, 'messages.error') || 'Harita görüntüsü oluşturulamadı';
        showNotification(msg4, 'error');
    });
}

// Dosya indirme fonksiyonu
function downloadFile(filename, type) {
    // Bu fonksiyon örnek amaçlıdır, gerçek dosya indirme işlemi için sunucu tarafı kod gerekebilir
    let content = '';
    let mimeType = '';
    
    switch (type) {
        case 'csv':
            content = 'latitude,longitude,location\n39.245472,35.487361,Eşrefpaşa/Çandır, Yozgat';
            mimeType = 'text/csv';
            break;
        case 'pdf':
            // PDF içeriği oluşturma işlemleri
            content = 'PDF içeriği burada olacak';
            mimeType = 'application/pdf';
            break;
        case 'geojson':
            content = JSON.stringify({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [35.487361, 39.245472]
                },
                properties: {
                    name: "Türkiye'nin Coğrafi Merkezi",
                    location: "Eşrefpaşa/Çandır, Yozgat"
                }
            }, null, 2);
            mimeType = 'application/geo+json';
            break;
        default:
            console.error('Desteklenmeyen dosya türü');
            return;
    }
    
    // Blob oluştur ve indir
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`${filename} dosyası indiriliyor...`, 'success');
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info') {
    // Mevcut bildirimi kontrol et
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // İkon ekle
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Bildirimi ekle
    document.body.appendChild(notification);
    
    // Otomatik kaldır
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// CSS animasyonu için stil ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification.success {
        background-color: #2ecc71;
    }
    
    .notification.error {
        background-color: #e74c3c;
    }
    
    .notification.info {
        background-color: #3498db;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde haritayı başlat
window.addEventListener('load', function() {
    initMap();
});

// Pencere boyutu değiştiğinde haritayı yeniden boyutlandır
window.addEventListener('resize', function() {
    if (window.map) {
        setTimeout(() => {
            window.map.invalidateSize();
        }, 200);
    }
});

// Uç nokta kartlarındaki "Haritada Göster" butonları için (sayfa içi harita)
function focusOnPoint(lat, lon, name) {
    // Harita hazır değilse başlat
    if (!window.map) {
        initMap();
        // Harita başlatıldıktan sonra kısa bir gecikme
        setTimeout(() => focusOnPoint(lat, lon, name), 300);
        return;
    }

    const target = [lat, lon];

    // Haritayı konuma odakla ve kaydır
    window.map.setView(target, 8, {
        animate: true,
        duration: 1
    });

    // Önceki işaretçileri temizle (mesafe işaretçilerini değil)
    if (window.extremePointMarker) {
        window.map.removeLayer(window.extremePointMarker);
    }

    // İşaretçi ekle
    window.extremePointMarker = L.marker(target, {
        icon: L.divIcon({
            className: 'extreme-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [35, 35],
            iconAnchor: [17.5, 35]
        })
    }).addTo(window.map);

    window.extremePointMarker.bindPopup(`
        <div class="marker-popup">
            <h3>${name}</h3>
            <p><i class="fas fa-map-pin"></i> Koordinat: ${lat.toFixed(6)}° N, ${lon.toFixed(6)}° E</p>
        </div>
    `).openPopup();
    
    // Harita bölümüne yumuşak kaydır
    document.querySelector('#harita').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showNotification(`${name} haritada gösteriliyor`, 'info');
}

// Google Maps'te açma fonksiyonu
function openInMaps(lat, lon, name) {
    // Google Maps URL'i oluştur
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}&ll=${lat},${lon}&z=12&t=m`;
    
    // Yeni sekmede aç
    window.open(mapsUrl, '_blank');
    
    // Bildirim göster
    showNotification(`${name} Google Maps'te açılıyor...`, 'info');
}

// Yukarı Çık Butonu
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    // Sayfa kaydırıldığında butonu göster/gizle
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Butona tıklandığında yukarı kaydır
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Footer Tarih/Saat Güncellemesi
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeStr = now.toLocaleDateString('tr-TR', options);
    
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeStr;
    }
}

// Tarih/saati başlat ve her saniye güncelle
updateDateTime();
setInterval(updateDateTime, 1000);

// Ziyaretçi Widget Kontrolü
const visitorWidget = document.getElementById('visitorWidget');
const widgetToggle = document.getElementById('widgetToggle');
const widgetHeader = document.querySelector('.widget-header');

if (visitorWidget && widgetToggle && widgetHeader) {
    // localStorage'dan açık/kapalı durumunu al
    const isCollapsed = localStorage.getItem('widgetCollapsed') === 'true';
    if (isCollapsed) {
        visitorWidget.classList.add('collapsed');
    }
    
    // Widget header'a tıklayınca aç/kapat
    widgetHeader.addEventListener('click', function() {
        visitorWidget.classList.toggle('collapsed');
        const collapsed = visitorWidget.classList.contains('collapsed');
        localStorage.setItem('widgetCollapsed', collapsed);
    });
}

// Google Analytics Verilerini Çekme (Simüle)
// GERÇEK kullanım için Google Analytics API entegrasyonu gerekir
// Visitor stats: try to use a PHP endpoint (visitor.php) if available. Fallback to local simulation.
window.VISITOR_ENDPOINT = window.VISITOR_ENDPOINT || 'visitor.php';

function updateVisitorStats() {
    // increment local pageViews counter
    let pageViews = parseInt(localStorage.getItem('pageViews') || '0');
    pageViews++;
    localStorage.setItem('pageViews', pageViews.toString());

    // Try fetch real stats from server-side endpoint
    fetch(`${window.VISITOR_ENDPOINT}?action=stats`, { cache: 'no-store' })
        .then(res => {
            if (!res.ok) throw new Error('stats fetch failed');
            return res.json();
        })
        .then(data => {
            // expected { total: n, today: n, last_updated: 'YYYY-MM-DD' }
            const total = data.total || 0;
            const today = data.today || 0;
            const active = data.active || 0;

            const totalEl = document.getElementById('totalVisitors');
            const todayEl = document.getElementById('todayVisitors');
            const activeEl = document.getElementById('activeVisitors');
            const pageViewsEl = document.getElementById('pageViews');

            if (totalEl) totalEl.textContent = total.toLocaleString('tr-TR');
            if (todayEl) todayEl.textContent = today.toLocaleString('tr-TR');
            if (activeEl) activeEl.textContent = (active || 0).toLocaleString('tr-TR');
            if (pageViewsEl) pageViewsEl.textContent = pageViews.toLocaleString('tr-TR');
        })
        .catch(err => {
            // fallback: avoid showing fake hardcoded numbers; show placeholders so admin can provide real data
            if (window.DEBUG) console.debug('Visitor stats fetch failed, showing placeholders', err);
            const totalEl = document.getElementById('totalVisitors');
            const todayEl = document.getElementById('todayVisitors');
            const activeEl = document.getElementById('activeVisitors');
            const pageViewsEl = document.getElementById('pageViews');
            if (totalEl) totalEl.textContent = '—';
            if (todayEl) todayEl.textContent = '—';
            if (activeEl) activeEl.textContent = '—';
            if (pageViewsEl) pageViewsEl.textContent = pageViews.toLocaleString('tr-TR');
        });

    // send a lightweight POST to record page view (best-effort)
    try {
        fetch(window.VISITOR_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'page_view', path: window.location.pathname, href: window.location.href, ts: Date.now() })
        }).catch(e => { if (window.DEBUG) console.debug('visitor post failed', e); });
    } catch (e) { if (window.DEBUG) console.debug('visitor post exception', e); }
}

// Widget verilerini başlat
updateVisitorStats();

// Her 30 saniyede bir güncelle (opsiyonel)
setInterval(updateVisitorStats, 30000);

/* -----------------------------
   Sosyal Paylaşım Fonksiyonları
   ----------------------------- */
function shareOnFacebook() {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
}

function shareOnTwitter() {
    const url = window.location.href;
    const text = document.title || "Türkiye'nin Tam Ortası";
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
}

function shareOnWhatsApp() {
    const url = window.location.href;
    const text = `${document.title} - ${url}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'noopener');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
}

function copyPageLink() {
    const url = window.location.href;
    if (!navigator.clipboard) {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        try { 
            document.execCommand('copy'); 
            const msg = getNested(window.translations, 'messages.linkCopied') || 'Sayfa linki kopyalandı';
            showNotification(msg, 'success'); 
        } catch(e) { 
            const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
            showNotification(msg, 'error'); 
        }
        document.body.removeChild(ta);
        return;
    }
    navigator.clipboard.writeText(url).then(() => {
        const msg = getNested(window.translations, 'messages.linkCopied') || 'Sayfa linki kopyalandı';
        showNotification(msg, 'success');
    }).catch(err => {
        console.error('Kopyalama hatası', err);
        const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
        showNotification(msg, 'error');
    });
}

/* -----------------------------
   QR Kod Modal (Koordinatlar için)
   ----------------------------- */
function showQRCode() {
    const lat = window.centerLat || 39.245472;
    const lon = window.centerLon || 35.487361;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    // Eğer modal zaten varsa kaldır
    const existing = document.getElementById('qrModal');
    if (existing) existing.remove();

    // Modal elemanını oluştur (qrContainer içine QR kod üretilecek)
    const modal = document.createElement('div');
    modal.id = 'qrModal';
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-backdrop" id="qrModalBackdrop"></div>
        <div class="qr-modal-content">
            <button class="qr-close" id="qrCloseBtn" title="Kapat">&times;</button>
            <h3>Türkiye'nin Tam Ortası Koordinat QR Kodu</h3>
            <p>${lat.toFixed(6)}° N, ${lon.toFixed(6)}° E</p>
            <div id="qrContainer" style="display:flex; justify-content:center;">
                <!-- QR kod burada oluşturulacak -->
            </div>
            <div class="qr-actions">
                <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-primary">Haritada Aç</a>
                <button class="btn btn-secondary" id="qrCopyLink">Linki Kopyala</button>
                <button class="btn btn-info" id="qrDownloadBtn">QR İndir</button>
            </div>
            <small style="display:block; margin-top:8px; color:var(--text-light);">QR kodu taradığınızda Google Maps ile açılır.</small>
        </div>
    `;

    document.body.appendChild(modal);

    // QR kodu client-side üret (qrcodejs kullan)
    try {
        const container = document.getElementById('qrContainer');
        // temizle
        container.innerHTML = '';
        const qr = new QRCode(container, {
            text: mapsUrl,
            width: 300,
            height: 300,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // İndir butonu davranışı
        document.getElementById('qrDownloadBtn').addEventListener('click', () => {
            // qrcodejs bazen img ya da canvas üretir
            const img = container.querySelector('img');
            if (img && img.src) {
                downloadDataUrl(img.src, `turkiye_merkezi_qr_${lat.toFixed(6)}_${lon.toFixed(6)}.png`);
                return;
            }
            const canvas = container.querySelector('canvas');
            if (canvas) {
                const dataUrl = canvas.toDataURL('image/png');
                downloadDataUrl(dataUrl, `turkiye_merkezi_qr_${lat.toFixed(6)}_${lon.toFixed(6)}.png`);
                return;
            }
            const msg = getNested(window.translations, 'messages.error') || 'QR kod oluşturulamadı';
            showNotification(msg, 'error');
        });
    } catch (err) {
        console.error('QR oluşturma hatası', err);
        showNotification('QR oluşturmada hata oluştu', 'error');
    }

    // Kapatma davranışları
    document.getElementById('qrCloseBtn').addEventListener('click', () => modal.remove());
    document.getElementById('qrModalBackdrop').addEventListener('click', () => modal.remove());
    document.getElementById('qrCopyLink').addEventListener('click', () => {
        if (!navigator.clipboard) {
            const ta = document.createElement('textarea'); ta.value = mapsUrl; document.body.appendChild(ta); ta.select(); 
            try { 
                document.execCommand('copy'); 
                const msg = getNested(window.translations, 'messages.mapLinkCopied') || 'Harita linki kopyalandı';
                showNotification(msg, 'success'); 
            } catch(e){ 
                const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
                showNotification(msg, 'error'); 
            } 
            document.body.removeChild(ta); return;
        }
        navigator.clipboard.writeText(mapsUrl).then(() => {
            const msg = getNested(window.translations, 'messages.mapLinkCopied') || 'Harita linki kopyalandı';
            showNotification(msg, 'success');
        }).catch(() => {
            const msg = getNested(window.translations, 'messages.error') || 'Kopyalama başarısız';
            showNotification(msg, 'error');
        });
    });

    // Yardımcı: dataURL indir
    function downloadDataUrl(dataUrl, filename) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        const msg = getNested(window.translations, 'messages.downloadingQR') || 'QR görüntüsü indiriliyor...';
        showNotification(msg, 'success');
    }
}

/* -----------------------------
   Dark Mode Toggle
   ----------------------------- */
function applyDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleDarkMode() {
    const enabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
    // ikon güncelle (opsiyonel)
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        btn.innerHTML = enabled ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Sayfa yüklenirken localStorage'daki karanlık mod tercihine göre uygula
document.addEventListener('DOMContentLoaded', function() {
    const darkPref = localStorage.getItem('darkMode');
    if (darkPref === 'true') {
        applyDarkMode(true);
        const btn = document.getElementById('darkModeToggle');
        if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    // Analytics link behavior - DISABLED (modal removed, using widget instead)
    const analyticsLink = document.getElementById('analyticsLink');
    if (analyticsLink) {
        analyticsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Analytics widget handles display automatically
            // No modal popup needed
        });
    }
    // small footer Analiz link (under clock) - DISABLED
    const footerSmall = document.getElementById('footerAnalyticsSmall');
    if (footerSmall) {
        footerSmall.addEventListener('click', function(e) {
            e.preventDefault();
            // Analytics widget handles display automatically
        });
    }
});

// Show analytics modal using visitor.php?action=stats
function showAnalyticsModal() {
    // remove existing modal if any
    const existing = document.getElementById('analyticsModal');
    if (existing) existing.remove();

    // create modal shell
    const modal = document.createElement('div');
    modal.id = 'analyticsModal';
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-backdrop"></div>
        <div class="qr-modal-content">
            <button class="qr-close" id="analyticsClose">&times;</button>
            <h3>İstatistikler</h3>
            <div id="analyticsBody" style="min-width:260px; text-align:left; margin-top:0.6rem;">
                <p>Yükleniyor...</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // close handlers
    document.getElementById('analyticsClose').addEventListener('click', () => modal.remove());
    modal.querySelector('.qr-modal-backdrop').addEventListener('click', () => modal.remove());

    // Try to detect Google Analytics on the page (gtag or analytics.js)
    let gaDetected = false;
    let gaInfo = null;
    try {
        if (window.ga && typeof window.ga.getAll === 'function') {
            const trackers = window.ga.getAll();
            if (trackers && trackers.length) {
                gaDetected = true;
                gaInfo = trackers.map(t => t.get('trackingId')).join(', ');
            }
        } else if (typeof window.gtag === 'function' || Array.isArray(window.dataLayer)) {
            gaDetected = true;
            // try to find measurement id in dataLayer entries
            try {
                const cfg = (window.dataLayer || []).find(e => e && e['config']);
                if (cfg && cfg['config']) gaInfo = JSON.stringify(cfg['config']);
            } catch (e) { /* ignore */ }
        }
    } catch (e) { if (window.DEBUG) console.debug('ga detect err', e); }

    const body = document.getElementById('analyticsBody');
    if (body) {
        if (gaDetected) {
            body.innerHTML = `
                <p><strong>Google Analytics algılandı.</strong> ${gaInfo ? `<br><small>${gaInfo}</small>` : ''}</p>
                <p>Canlı ve tarihsel veriler yükleniyor...</p>
                <div id="analyticsCards" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-top:0.8rem;"></div>
                <div style="margin-top:0.8rem; display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn btn-secondary" id="analyticsOpenGA">Analytics Panelini Aç</button>
                    <button class="btn btn-primary" id="analyticsCloseBtn">Kapat</button>
                </div>`;

            // wire buttons
            const closeBtn = document.getElementById('analyticsCloseBtn');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
            const openGA = document.getElementById('analyticsOpenGA');
            if (openGA) openGA.addEventListener('click', () => window.open('https://analytics.google.com/', '_blank', 'noopener'));

            // fetch server-side GA proxy (reads GA Data API). We prefer server-side retrieval for historic data.
            fetch('admin/ga_proxy.php', { cache: 'no-store' })
                .then(r => { if (!r.ok) throw new Error('GA proxy failed'); return r.json(); })
                .then(json => {
                    const cards = document.getElementById('analyticsCards');
                    if (!cards) return;
                    // prefer aggregates if present
                    const ag = json.aggregates || {};
                    const ranges = [ ['1d','Günlük'], ['7d','Haftalık'], ['30d','Aylık'], ['365d','Yıllık'] ];
                    cards.innerHTML = '';
                    ranges.forEach(r => {
                        const key = r[0]; const label = r[1];
                        const data = ag[key];
                        const html = data && !data.error ? `
                            <div class="stat-card" style="background:var(--card);padding:12px;border-radius:8px;box-shadow:0 6px 14px rgba(0,0,0,0.06);">
                                <div style="font-size:0.9rem;color:var(--text-muted);">${label}</div>
                                <div style="font-size:1.2rem;font-weight:700;margin-top:6px;">${(data.activeUsers||0).toLocaleString('tr-TR')}</div>
                                <div style="font-size:0.8rem;color:var(--text-light); margin-top:6px;">Yeni: ${(data.newUsers||0).toLocaleString('tr-TR')} &nbsp; Oturum: ${(data.sessions||0).toLocaleString('tr-TR')}</div>
                            </div>` : `
                            <div class="stat-card" style="background:var(--card);padding:12px;border-radius:8px;">
                                <div style="font-size:0.9rem;color:var(--text-muted);">${label}</div>
                                <div style="font-size:1rem;color:var(--text-light);margin-top:6px;">Veri yok</div>
                            </div>`;
                        const el = document.createElement('div'); el.innerHTML = html; cards.appendChild(el.firstElementChild);
                    });

                    // optional: show realtime active users if present
                    if (json.realtime && typeof json.realtime.activeUsers !== 'undefined') {
                        const live = document.createElement('div');
                        live.style.marginTop = '10px';
                        live.innerHTML = `<small style="color:var(--text-muted);">Canlı Aktif Kullanıcılar:</small> <strong style="margin-left:6px;">${(json.realtime.activeUsers||0).toLocaleString('tr-TR')}</strong>`;
                        cards.parentNode.insertBefore(live, cards.nextSibling);
                    }
                })
                .catch(err => {
                    if (window.DEBUG) console.debug('ga proxy error', err);
                    const cards = document.getElementById('analyticsCards');
                    if (cards) cards.innerHTML = '<div style="grid-column:1/-1;color:var(--text-light);">GA verileri alınamadı.</div>';
                });

        } else {
            body.innerHTML = `<p>Google Analytics tespit edilmedi veya erişilemiyor.</p>
               <p>Sunucu tarafı sayaç (visitor.php) varsa aşağıdaki veriler gösterilecektir.</p>
               <div id="visitorFetchPlaceholder" style="margin-top:0.6rem;"><em>Yükleniyor...</em></div>
               <div style="margin-top:0.8rem; display:flex; gap:0.5rem; justify-content:flex-end;">
                   <button class="btn btn-primary" id="analyticsCloseBtn">Kapat</button>
               </div>`;
            const closeBtn = document.getElementById('analyticsCloseBtn');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
        }
    }

    // Regardless of GA detection, try to fetch server-side visitor stats and show them (if available)
    fetch(`${window.VISITOR_ENDPOINT}?action=stats`, { cache: 'no-store' })
        .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.json(); })
        .then(data => {
            const total = data.total || 0;
            const today = data.today || 0;
            const active = data.active || 0;
            const last = data.last_updated || '';
            const placeholder = document.getElementById('visitorFetchPlaceholder');
            if (placeholder) {
                placeholder.innerHTML = `\
                    <p><strong>Sunucu Sayaç Verisi:</strong></p>\
                    <p>Toplam: ${total.toLocaleString('tr-TR')} &nbsp; Bugün: ${today.toLocaleString('tr-TR')} &nbsp; Aktif: ${active.toLocaleString('tr-TR')}</p>\
                    <p style="color:var(--text-light); font-size:0.9rem;"><em>Son güncelleme: ${last}</em></p>`;
            }
        })
        .catch(err => {
            if (window.DEBUG) console.debug('visitor fetch failed', err);
            const placeholder = document.getElementById('visitorFetchPlaceholder');
            if (placeholder) placeholder.innerHTML = `<p>Sunucu sayaç verisi alınamadı.</p>`;
        });
}

/* -----------------------------
   Basit i18n (TR/EN) yükleyici
   ----------------------------- */
function fetchTranslations(lang) {
    // Use relative path so it works on shared/static hosting (no leading slash)
    const url = `locales/${lang}/translation.json`;
    // Try fetch first, but if it fails (file:// or hosting issue), fall back to inline JSON blocks in the page
    return fetch(url).then(res => {
        if (!res.ok) throw new Error('Çeviri dosyası yüklenemedi');
        return res.json();
    }).catch(() => {
        try {
            const el = document.getElementById(`i18n-${lang}`);
            if (el) return JSON.parse(el.textContent);
        } catch (e) {
            console.warn('Inline çeviri parse hatası', e);
        }
        // as last resort, try to find any inline translation and return minimal object
        const any = document.querySelector('script[id^="i18n-"]');
        if (any) {
            try { return JSON.parse(any.textContent); } catch(e) { /* ignore */ }
        }
        throw new Error('Çeviri dosyası bulunamadı');
    });
}

// Add fallback data-i18n attributes for static Turkish text that wasn't marked in HTML.
function addFallbackI18nMarkers() {
    const map = [
        { sel: 'section#metodoloji .section-title', key: 'methodology.title' },
        { sel: '.method-card:nth-of-type(1) h3', key: 'methodology.centroid' },
        { sel: '.method-card:nth-of-type(1) p', key: 'methodology.centroid_description' },
        { sel: '.method-card:nth-of-type(2) h3', key: 'methodology.projection' },
        { sel: '.method-card:nth-of-type(2) p', key: 'methodology.projection_description' },
        { sel: '.method-card:nth-of-type(3) h3', key: 'methodology.repeatability' },
        { sel: '.method-card:nth-of-type(3) p', key: 'methodology.repeatability_description' },
        { sel: 'section.content-section h2.section-title', key: 'technical.title' },
        { sel: '#indirmeler .section-title', key: 'downloads.title' },
        { sel: '#egitim .section-title', key: 'education.title' },
        { sel: '#ozet .section-title', key: 'summary.title' },
        { sel: '.download-card:nth-of-type(1) h3', key: 'downloads.python' },
        { sel: '.download-card:nth-of-type(2) h3', key: 'downloads.documentation' },
        { sel: '.download-card:nth-of-type(3) h3', key: 'downloads.data' }
    ];

    map.forEach(m => {
        try {
            const el = document.querySelector(m.sel);
            if (el && !el.hasAttribute('data-i18n')) {
                el.setAttribute('data-i18n', m.key);
            }
        } catch (e) {
            // ignore selector errors
        }
    });
}

function getNested(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
}

function applyTranslations(dict) {
    // Update document title
    const appTitle = getNested(dict, 'app.title');
    if (appTitle) document.title = appTitle;

    // Replace data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = getNested(dict, key);
        if (val === null) return;

        // Simple placeholder replacements
        let out = val;
        const coords = `${(window.centerLat||39.245472).toFixed(6)}° N, ${(window.centerLon||35.487361).toFixed(6)}° E`;
        out = out.replace(/\{\{coords\}\}/g, coords);
        out = out.replace(/\{\{lat\}\}/g, (window.centerLat||39.245472).toFixed(6));
        out = out.replace(/\{\{lon\}\}/g, (window.centerLon||35.487361).toFixed(6));
        out = out.replace(/\{\{location\}\}/g, getNested(dict, 'summary.location') || '');

        // Special case: allow HTML for known keys with <i> tags
        const htmlKeys = [
            'education.goto_methodology',
            'education.goto_extreme'
        ];
        if (htmlKeys.includes(key)) {
            el.innerHTML = out;
        } else if (el.hasAttribute('data-i18n-placeholder')) {
            const phKey = el.getAttribute('data-i18n-placeholder');
            const phVal = getNested(dict, phKey);
            if (phVal !== null) el.setAttribute('placeholder', phVal);
        } else if (el.tagName.toLowerCase() === 'input' && !el.hasAttribute('data-i18n-placeholder')) {
            el.setAttribute('placeholder', out);
        } else {
            el.textContent = out;
        }
    });

    // placeholder for search input
    const searchKey = getNested(dict, 'common.search');
    const locInput = document.getElementById('locationInput');
    if (locInput && searchKey) locInput.setAttribute('placeholder', searchKey);

    // footer coordinates template
    const footerCoordsTpl = getNested(dict, 'footer.coordinates_value');
    if (footerCoordsTpl) {
        const latDir = (window.centerLat>=0)?'N':'S';
        const lonDir = (window.centerLon>=0)?'E':'W';
        const coordsStr = footerCoordsTpl.replace('{{lat}}', (window.centerLat).toFixed(6)).replace('{{lon}}', (window.centerLon).toFixed(6)).replace('{{latDir}}', latDir).replace('{{lonDir}}', lonDir);
        const footerCoordEl = document.querySelector('.footer-coords a.footer-link');
        if (footerCoordEl) footerCoordEl.textContent = coordsStr;
    }
}

function loadLanguage(lang) {
    fetchTranslations(lang).then(dict => {
        window.translations = dict;
        applyTranslations(dict);
        // set lang label and nav title
        const lbl = document.getElementById('langLabel');
        if (lbl) {
            lbl.textContent = lang.toUpperCase();
        }
        localStorage.setItem('lang', lang);
    }).catch(err => {
        console.error('Çeviri yükleme hatası', err);
        showNotification('Çeviri yüklenemedi', 'error');
    });
}

// PDF indirme işlevi
function downloadPDF() {
    const lang = localStorage.getItem('lang') || 'tr';
    const url = 'generate_pdf.php?lang=' + lang;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = lang === 'tr' 
        ? 'Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf'
        : 'Turkey_Geographic_Center_Verification_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Dil toggle butonu
// Yukarıdaki ana DOMContentLoaded başlatıcıya eklenmiştir. Duplicate event kaldırıldı. Tüm dil ve menü işlemleri tek eventte.
