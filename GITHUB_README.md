# Türkiye'nin Tam Ortası - Belge Deposu

Bu depo, Türkiye'nin coğrafi merkezi hakkındaki resmi belgeleri ve veri dosyalarını içerir.

## 📊 İçerik

### Raporlar
- **Türkçe Rapor**: `Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf`
- **English Report**: `Turkey_Geographic_Center_Verification_Report.pdf`

### Veri Dosyaları
- **CSV Koordinatları**: `turkiye_merkez_koordinatlari.csv`
- **GeoJSON Harita**: `turkiye_merkez_harita.geojson`

## 🎯 Merkez Koordinatları

| Bilgi | Değer |
|-------|-------|
| **Enlem** | 39.245472° N |
| **Boylam** | 35.487361° E |
| **Konum** | Eşrefpaşa/Çandır, Yozgat |
| **Koordinat Sistemi** | WGS84 (EPSG:4326) |
| **Projeksiyon** | Lambert Azimuthal Equal-Area (LAEA) |

## 📥 İndirme

[En son yayını indir →](https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/latest)

### Hızlı İndir
```bash
# Raporları indir
wget https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/download/latest/Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf
wget https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/download/latest/Turkey_Geographic_Center_Verification_Report.pdf

# Veri dosyalarını indir
wget https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/download/latest/turkiye_merkez_koordinatlari.csv
wget https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/download/latest/turkiye_merkez_harita.geojson
```

## 📖 Metodoloji

Türkiye'nin geometrik merkezi, Alan-Ağırlıklı Centroid yöntemi kullanılarak hesaplanmıştır:

1. **Veri Kaynağı**: GADM v4.1 (Global Administrative Areas)
2. **Koordinat Sistemi**: WGS84 (EPSG:4326)
3. **Projeksiyon**: Lambert Azimuthal Equal-Area (LAEA)
4. **Yazılım**: QGIS 3.28, Python, GDAL/OGR

## 🔍 Doğrulama

Veriler bilimsel olarak işlenmiş ve doğrulanmıştır.

## 📝 Lisans

Creative Commons CC BY-SA 4.0

## 🔗 İlgili Bağlantılar

- [Ana Site](https://merkez.web.tr/)
- [GitHub](https://github.com/turkiyeninortasi)
- [Harita](https://maps.google.com/?q=39.245472,35.487361)

---

**Son Güncelleme**: 9 Aralık 2025
