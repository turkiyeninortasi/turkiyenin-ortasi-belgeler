# GitHub Actions Automation - Setup Guide
## Turkey's Geographic Center - Document Publishing Automation

---

## 📋 Overview

This guide enables automatic publishing of the Turkey's Geographic Center document repository using GitHub Actions.

### ✨ Features

- ✅ Automatic PDF generation (Turkish & English)
- ✅ Upload coordinate data to GitHub releases
- ✅ Share map files (GeoJSON)
- ✅ Create automatic releases on each push
- ✅ Full UTF-8 character support

---

## 🚀 Step 1: Clone the Repository

```bash
git clone https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler.git
cd turkiyenin-ortasi-belgeler
```

---

## 📁 Step 2: Create Folder Structure

```bash
mkdir -p .github/workflows
mkdir -p docs
mkdir -p data
```

---

## 📋 Step 3: Add GitHub Actions Workflow

**File**: `.github/workflows/publish-documents.yml`

This file is already provided. What you need to do:

1. Copy `.github/workflows/publish-documents.yml` to your repository
2. Review the file and make necessary adjustments

---

## 📊 Step 4: Prepare Data Files

### CSV Coordinate File
**File**: `data/turkiye_merkez_koordinatlari.csv`

```csv
lat,lon,name,country,region,accuracy_km
39.245472,35.487361,Turkey's Geographic Center,Turkey,Yozgat,0
```

### GeoJSON Map File
**File**: `data/turkiye_merkez_harita.geojson`

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Turkey's Geographic Center",
        "location": "Esrefpasa/Candir, Yozgat"
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

## 📝 Step 5: Add README.md File

**File**: `README.md`

```markdown
# Turkey's Geographic Center - Documents Repository

This repository contains official documents about Turkey's geographic center.

## Download

[Download latest release](https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler/releases/latest)

**Center Coordinates:** 39.245472° N, 35.487361° E
```

---

## 🔧 Step 6: Configure Git

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## 📤 Step 7: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Setup repository structure and GitHub Actions"
git branch -M main
git remote add origin https://github.com/turkiyeninortasi/turkiyenin-ortasi-belgeler.git
git push -u origin main
```

---

## ✅ Step 8: Verify GitHub Actions

1. Go to your GitHub repository's **Actions** tab
2. You should see the **Publish Documents** workflow
3. Check if the latest push completed successfully
4. If you see a green ✓ checkmark, the workflow succeeded

---

## 🎯 Step 9: Download Releases

1. Go to your GitHub repository's **Releases** tab
2. Open the latest release (`v1`, `v2`, etc.)
3. You can download the following files:
   - `Türkiye_Tam_Ortası_Doğrulama_Raporı.pdf`
   - `Turkey_Geographic_Center_Verification_Report.pdf`
   - `turkiye_merkez_koordinatlari.csv`
   - `turkiye_merkez_harita.geojson`

---

## 🔄 Step 10: Automatic Publishing Flow

**The workflow runs automatically on each push:**

```
1. Code is pushed (if docs/ or data/ folders change)
   ↓
2. GitHub Actions is triggered
   ↓
3. PDF files are generated
   ↓
4. New release is created (with v{run_number} tag)
   ↓
5. All files are uploaded to the release
   ↓
6. README.md is automatically updated
   ↓
7. Notification is sent (optional)
```

---

## 🛠️ Troubleshooting

### Workflow fails
- Check GitHub Actions logs (Actions → Workflow name → latest run)
- Verify file paths are correct
- Ensure UTF-8 encoding is used

### Files not uploaded
- Verify `docs/` and `data/` folders exist
- Check file names (special characters must be UTF-8)
- Ensure release creation step succeeded

### Character corruption
- Save all text files as UTF-8
- Verify PDF generation command has UTF-8 support

---

## 📚 Related Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Creating Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/creating-releases)

---

## 📞 Support

If you encounter issues:
1. Open a GitHub Issue
2. Share workflow logs
3. Provide detailed error description

---

**Last Updated**: December 9, 2025  
**Version**: 1.0
