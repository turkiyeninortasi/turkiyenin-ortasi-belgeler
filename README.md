# Türkiye'nin Ortası - Belgeler Deposu

Bu depo, Türkiye'nin coğrafi merkezi hakkındaki resmi belgeleri, akademik çalışmaları ve veri dosyalarını içerir.

**🌐 Web Sitesi:** [https://merkez.web.tr/](https://merkez.web.tr/)

## 📊 İçerik

### 📄 Raporlar
- **Türkiye Tam Ortası Doğrulama Raporı** (Türkçe) - `Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf`
- **Turkey Geographic Center Verification Report** (English) - `Turkey_Geographic_Center_Verification_Report.pdf`
- **Türkiye Ortası Akademik Çalışma** (Türkçe) - `Turkiye_Ortasi_Akademik_Calisma_TR.pdf`
- **Turkey's Geographic Center Academic Study** (English) - `Turkey_Geographic_Center_Academic_Study_EN.pdf`

### 🗺️ Veri Dosyaları
- **CSV Koordinatları:** `data/turkiye_merkez_koordinatlari.csv` - Merkez ve uç noktalar
- **GeoJSON Harita:** `data/turkiye_merkez_harita.geojson` - Coğrafi veri formatında
- **Koordinat JSON:** `data/coordinates.json` - JSON formatında tüm koordinatlar

### 🐍 Python Araçları
- **geographic_center.py** - Merkez bilgisi ve hesaplamalar
- **data_processor.py** - Veri formatı dönüştürme ve analiz

## 🎯 Merkez Koordinatları

| Bilgi | Değer |
|-------|-------|
| **Enlem (Latitude)** | 39.245472° N |
| **Boylam (Longitude)** | 35.487361° E |
| **Konum** | Eşrefpaşa/Çandır, Yozgat |
| **Koordinat Sistemi** | WGS84 (EPSG:4326) |
| **Bölge Kodu** | TR-66 (Yozgat) |

## 📍 Uç Noktalar (Extreme Points)

| Yön | Konum | Enlem | Boylam | Mesafe |
|-----|-------|-------|--------|--------|
| **Kuzey** | Kastamonou | 41.738289° | 33.739619° | ~268 km |
| **Güney** | Antakya | 35.813254° | 36.161953° | ~398 km |
| **Doğu** | Hakkari | 43.603417° | 45.558022° | ~558 km |
| **Batı** | İzmir | 35.180997° | 26.109211° | ~612 km |

## 📥 İndirme

En son belgeleri ve verileri şuradan indirebilirsiniz:

[GitHub Releases →](https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/latest)

## 🔬 Metodoloji

Türkiye'nin geometrik merkezi aşağıdaki yöntemlerle hesaplanmıştır:

1. **Alan-Ağırlıklı Centroid (Area-Weighted Centroid) Yöntemi**
   - Ülkenin detaylı topografik haritası analiz edilmiştir
   - Her bölgenin alanı Gauss alan formülü ile hesaplanmıştır
   - Bölgelerin ağırlık merkezleri belirlenmiştir
   - Genel merkez, ağırlıklı ortalama kullanılarak bulunmuştur

2. **Koordinat Sistemi: WGS84 (EPSG:4326)**
   - Uluslararası standart coğrafik koordinat sistemi
   - GPS ve haritalama uygulamalarında kullanılan sistem

3. **Doğrulama: Saha Araştırması**
   - Uzmanlar tarafından saha ziyareti gerçekleştirilmiştir
   - Yerel veriler ile karşılaştırma yapılmıştır
   - Harita ölçümleri doğrulanmıştır

## 📖 Belgeler

### Türkçe Dokumentasyon
- **docs/GITHUB_README.md** - GitHub ana sayfası
- **docs/GITHUB_SETUP_GUIDE_TR.md** - Kurulum rehberi (Türkçe)
- **docs/GITHUB_FILE_STRUCTURE.md** - Dosya yapısı açıklaması
- **docs/API_DOCUMENTATION.md** - Python API referansı

### English Documentation
- **docs/GITHUB_SETUP_GUIDE_EN.md** - Setup Guide (English)
- **docs/GITHUB_USAGE_GUIDE.md** - Usage examples
- **docs/GITHUB_COMPREHENSIVE_README.md** - Complete documentation

## 🛠️ Kullanım

### Python Scriptlerini Çalıştırma

**Gereksinimler:**
```bash
pip install -r scripts/requirements.txt
```

**Merkez Bilgisi Alma:**
```bash
python scripts/geographic_center.py
```

**Veri İşleme:**
```bash
python scripts/data_processor.py --input data/turkiye_merkez_koordinatlari.csv --output data/turkiye_merkez_harita.geojson
python scripts/data_processor.py --input data/turkiye_merkez_harita.geojson --validate
```

### Web Arayüzünü Kullanma

1. Dosyaları bir web sunucusuna yükleme (Apache, Nginx, vb.)
2. `index.html` dosyasını tarayıcıda açma
3. Harita üzerinde Türkiye'nin ortasını görme
4. Dil değiştirme (Türkçe/İngilizce) yapma
5. PDF rapor indirme

## 🔗 Bağlantılar

- **Web Sitesi:** https://merkez.web.tr/
- **Belgeler:** https://merkez.web.tr/belgeler/
- **E-posta:** info@merkez.web.tr
- **GitHub Profili:** https://github.com/turkiyeninortasi

## 📝 Lisans

Bu proje **CC BY-SA 4.0** lisansı altında yayınlanmıştır.

**CC BY-SA 4.0 Özet:**
- ✅ Kullanabilirsiniz
- ✅ Değiştirebilirsiniz
- ✅ Dağıtabilirsiniz
- ✅ Ticari amaçla kullanabilirsiniz
- ⚠️ Şartlar: Atıf yapmalısınız, aynı lisans altında yayınlamalısınız

Detaylı lisans: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.tr)

## 📊 Proje İstatistikleri

- **Başlangıç:** 2025
- **Merkez Koordinatları:** 5 ana nokta (merkez + 4 uç)
- **Veri Formatları:** CSV, GeoJSON, JSON
- **Dil Desteği:** Türkçe, İngilizce
- **Lisans:** CC BY-SA 4.0

## 🤝 Katkıda Bulunma

Bu projede katkıda bulunmak isterseniz:

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'e push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

- **E-posta:** info@merkez.web.tr
- **GitHub:** https://github.com/turkiyeninortasi
- **Web:** https://merkez.web.tr

---

**Son Güncelleme:** 9 Aralık 2025

**Yayıncı:** Türkiye'nin Ortası Akademik Çalışma Grubu

**Versiyon:** 1.0.0

**Status:** ✅ Aktif Proje
