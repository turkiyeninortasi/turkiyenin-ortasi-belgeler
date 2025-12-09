# GitHub Actions Automation - Kurulum Rehberi
## Türkiye'nin Tam Ortası - Belge Yayını Otomasyonu

---

## 📋 Genel Bakış

Bu kılavuz, Türkiye'nin Tam Ortası belge deposunun GitHub Actions kullanılarak otomatik olarak yayınlanmasını sağlar.

### ✨ Özellikler

- ✅ Otomatik PDF oluşturma (Türkçe & İngilizce)
- ✅ Koordinat verilerinin GitHub releases'e yüklenmesi
- ✅ Harita dosyalarının (GeoJSON) paylaşılması
- ✅ Her push'ta otomatik yayın oluşturma
- ✅ UTF-8 karakterleri tam destekleme

---

## 🚀 Adım 1: Depoyu Klonlayın

```bash
git clone https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler.git
cd turkiyenin-ortasi-belgeler
```

---

## 📁 Adım 2: Klasör Yapısını Oluşturun

```bash
mkdir -p .github/workflows
mkdir -p docs
mkdir -p data
```

---

## 📋 Adım 3: GitHub Actions Workflow'u Ekleyin

**Dosya**: `.github/workflows/publish-documents.yml`

Bu dosya zaten sağlanmıştır. Yapmanız gereken:

1. `.github/workflows/publish-documents.yml` dosyasını deponuza kopyalayın
2. Dosyayı kontrol edin ve gerekli değişiklikleri yapın

---

## 📊 Adım 4: Veri Dosyalarını Hazırlayın

### CSV Koordinat Dosyası
**Dosya**: `data/turkiye_merkez_koordinatlari.csv`

```csv
lat,lon,name,country,region,accuracy_km
39.245472,35.487361,Türkiye'nin Tam Ortası,Türkiye,Yozgat,0
```

### GeoJSON Harita Dosyası
**Dosya**: `data/turkiye_merkez_harita.geojson`

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Türkiye'nin Tam Ortası",
        "location": "Eşrefpaşa/Çandır, Yozgat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [35.487361, 39.245472]
      }
    }
  ]
}
```

---

## 📝 Adım 5: README.md Dosyasını Ekleyin

**Dosya**: `README.md`

```markdown
# Türkiye'nin Tam Ortası - Belgeler Deposu

Bu depo, Türkiye'nin coğrafi merkezi hakkındaki resmi belgeleri içerir.

## İndirme

[En son yayını indir](https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/latest)

**Merkez Koordinatları:** 39.245472° N, 35.487361° E
```

---

## 🔧 Adım 6: Git'i Konfigüre Edin

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## 📤 Adım 7: GitHub'a Push Edin

```bash
git add .
git commit -m "Initial commit: Setup repository structure and GitHub Actions"
git branch -M main
git remote add origin https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler.git
git push -u origin main
```

---

## ✅ Adım 8: GitHub Actions'ı Doğrulayın

1. GitHub deposunuzun **Actions** sekmesine gidin
2. **Publish Documents** workflow'unu görmelisiniz
3. En son push'un başarıyla tamamlanıp tamamlanmadığını kontrol edin
4. Eğer yeşil ✓ işareti görürseniz, workflow başarılı demektir

---

## 🎯 Adım 9: Release'leri İndirin

1. GitHub deposunun **Releases** sekmesine gidin
2. En son yayını (`v1`, `v2`, vb.) açın
3. Aşağıdaki dosyaları indirebilirsiniz:
   - `Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf`
   - `Turkey_Geographic_Center_Verification_Report.pdf`
   - `turkiye_merkez_koordinatlari.csv`
   - `turkiye_merkez_harita.geojson`

---

## 🔄 Adım 10: Otomatik Yayın Akışı

**Workflow her push'ta otomatik olarak çalışır:**

```
1. Kod push edilir (docs/ veya data/ klasörleri değişirse)
   ↓
2. GitHub Actions tetiklenir
   ↓
3. PDF dosyaları oluşturulur
   ↓
4. Yeni release oluşturulur (v{run_number} etiketi ile)
   ↓
5. Tüm dosyalar release'e yüklenir
   ↓
6. README.md otomatik güncellenir
   ↓
7. Bildirim gönderilir (opsiyonel)
```

---

## 🛠️ Sorun Giderme

### Workflow başarısız oluyor
- GitHub Actions günlüklerini kontrol edin (Actions → Workflow adı → son run)
- Dosya yollarının doğru olduğundan emin olun
- UTF-8 kodlama kullandığınızdan emin olun

### Dosyalar yüklenmedi
- `docs/` ve `data/` klasörlerinin mevcut olduğundan emin olun
- Dosya adlarını kontrol edin (özel karakterler UTF-8'de olmalı)
- Release oluşturma adımının başarılı olduğundan emin olun

### Karakter bozulması
- Tüm metin dosyalarını UTF-8 olarak kaydedin
- PDF oluşturma komutunun UTF-8 desteğine sahip olduğundan emin olun

---

## 📚 İlişkili Kaynaklar

- [GitHub Actions Belgeleri](https://docs.github.com/en/actions)
- [Workflow Sözdizimi](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Release Oluşturma](https://docs.github.com/en/repositories/releasing-projects-on-github/creating-releases)

---

## 📞 Destek

Sorun yaşıyorsanız:
1. GitHub Issues açın
2. Workflow günlüklerini paylaşın
3. Detaylı hata açıklamasını sağlayın

---

**Son Güncelleme**: 9 Aralık 2025  
**Sürüm**: 1.0
