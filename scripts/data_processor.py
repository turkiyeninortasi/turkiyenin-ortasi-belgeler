#!/usr/bin/env python3
"""
Türkiye'nin Tam Ortası - Veri İşleme Aracı
Turkey's Geographic Center - Data Processing Tool

CSV, GeoJSON ve JSON dosyalarını işler ve dönüştürür.
Process and convert CSV, GeoJSON and JSON files.
"""

import json
import csv
import argparse
import sys
from pathlib import Path
from typing import Dict, List, Tuple


class DataProcessor:
    """
    Coğrafi veri işleme sınıfı
    Geographic data processing class
    """
    
    def __init__(self):
        """Initialize the data processor"""
        self.data = None
        self.file_path = None
    
    def load_csv(self, file_path: str) -> List[Dict]:
        """
        CSV dosyasını yükle
        Load CSV file
        
        Args:
            file_path (str): CSV dosyasının yolu
        
        Returns:
            List[Dict]: CSV verisi
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                data = list(reader)
                self.data = data
                self.file_path = file_path
                return data
        except Exception as e:
            print(f"❌ CSV yükleme hatası / CSV loading error: {e}")
            return []
    
    def load_geojson(self, file_path: str) -> Dict:
        """
        GeoJSON dosyasını yükle
        Load GeoJSON file
        
        Args:
            file_path (str): GeoJSON dosyasının yolu
        
        Returns:
            Dict: GeoJSON verisi
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.data = data
                self.file_path = file_path
                return data
        except Exception as e:
            print(f"❌ GeoJSON yükleme hatası / GeoJSON loading error: {e}")
            return {}
    
    def load_json(self, file_path: str) -> Dict:
        """
        JSON dosyasını yükle
        Load JSON file
        
        Args:
            file_path (str): JSON dosyasının yolu
        
        Returns:
            Dict: JSON verisi
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.data = data
                self.file_path = file_path
                return data
        except Exception as e:
            print(f"❌ JSON yükleme hatası / JSON loading error: {e}")
            return {}
    
    def csv_to_geojson(self, csv_file: str, output_file: str = None) -> Dict:
        """
        CSV dosyasını GeoJSON'a dönüştür
        Convert CSV file to GeoJSON
        
        Args:
            csv_file (str): Giriş CSV dosyası
            output_file (str): Çıkış dosyası (opsiyonel)
        
        Returns:
            Dict: GeoJSON FeatureCollection
        """
        csv_data = self.load_csv(csv_file)
        
        if not csv_data:
            return {}
        
        features = []
        
        for row in csv_data:
            try:
                # Koordinatları al
                lat = float(row.get('latitude', 0))
                lon = float(row.get('longitude', 0))
                
                feature = {
                    "type": "Feature",
                    "properties": {
                        key: value for key, value in row.items()
                        if key not in ['latitude', 'longitude']
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lon, lat]
                    }
                }
                features.append(feature)
            except ValueError as e:
                print(f"⚠️  Koordinat hata / Coordinate error in row {row}: {e}")
                continue
        
        geojson = {
            "type": "FeatureCollection",
            "features": features
        }
        
        # Dosyaya kaydet
        if output_file:
            self.save_geojson(geojson, output_file)
        
        return geojson
    
    def geojson_to_csv(self, geojson_file: str, output_file: str = None) -> str:
        """
        GeoJSON dosyasını CSV'ye dönüştür
        Convert GeoJSON file to CSV
        
        Args:
            geojson_file (str): Giriş GeoJSON dosyası
            output_file (str): Çıkış dosyası (opsiyonel)
        
        Returns:
            str: CSV metni
        """
        geojson_data = self.load_geojson(geojson_file)
        
        if not geojson_data.get('features'):
            return ""
        
        features = geojson_data['features']
        
        # Tüm özellikleri topla
        all_keys = set()
        for feature in features:
            all_keys.update(feature.get('properties', {}).keys())
            all_keys.add('latitude')
            all_keys.add('longitude')
        
        # CSV yazma
        csv_lines = []
        csv_lines.append(','.join(sorted(all_keys)))
        
        for feature in features:
            props = feature.get('properties', {})
            coords = feature.get('geometry', {}).get('coordinates', [0, 0])
            
            row = {}
            for key in all_keys:
                if key == 'longitude':
                    row[key] = str(coords[0])
                elif key == 'latitude':
                    row[key] = str(coords[1])
                else:
                    row[key] = props.get(key, '')
            
            csv_lines.append(','.join(f'"{row[k]}"' for k in sorted(all_keys)))
        
        csv_text = '\n'.join(csv_lines)
        
        # Dosyaya kaydet
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(csv_text)
            print(f"✅ CSV dosyası kaydedildi / CSV file saved: {output_file}")
        
        return csv_text
    
    def validate_geojson(self, geojson_file: str) -> Tuple[bool, List[str]]:
        """
        GeoJSON dosyasını doğrula
        Validate GeoJSON file
        
        Args:
            geojson_file (str): GeoJSON dosyasının yolu
        
        Returns:
            Tuple: (Geçerli mi?, Hata listesi)
        """
        errors = []
        
        geojson_data = self.load_geojson(geojson_file)
        
        # Temel yapı kontrolü
        if not isinstance(geojson_data, dict):
            errors.append("GeoJSON root must be an object")
            return False, errors
        
        if geojson_data.get('type') not in ['FeatureCollection', 'Feature']:
            errors.append(f"Invalid GeoJSON type: {geojson_data.get('type')}")
            return False, errors
        
        # Features kontrolü
        if geojson_data.get('type') == 'FeatureCollection':
            if 'features' not in geojson_data:
                errors.append("FeatureCollection must have 'features' property")
                return False, errors
            
            for i, feature in enumerate(geojson_data['features']):
                if feature.get('type') != 'Feature':
                    errors.append(f"Feature {i}: Invalid feature type")
                
                geometry = feature.get('geometry')
                if geometry:
                    if geometry.get('type') not in ['Point', 'LineString', 'Polygon', 'MultiPoint']:
                        errors.append(f"Feature {i}: Invalid geometry type {geometry.get('type')}")
                    
                    coords = geometry.get('coordinates')
                    if geometry.get('type') == 'Point':
                        if not isinstance(coords, list) or len(coords) != 2:
                            errors.append(f"Feature {i}: Point coordinates must be [lon, lat]")
                        else:
                            try:
                                lon, lat = float(coords[0]), float(coords[1])
                                if not (-180 <= lon <= 180):
                                    errors.append(f"Feature {i}: Longitude {lon} out of range")
                                if not (-90 <= lat <= 90):
                                    errors.append(f"Feature {i}: Latitude {lat} out of range")
                            except (TypeError, ValueError):
                                errors.append(f"Feature {i}: Coordinates must be numbers")
        
        if errors:
            return False, errors
        else:
            return True, ["✅ GeoJSON is valid / GeoJSON geçerli"]
    
    def save_geojson(self, geojson: Dict, file_path: str) -> bool:
        """
        GeoJSON'u dosyaya kaydet
        Save GeoJSON to file
        
        Args:
            geojson (Dict): GeoJSON verisi
            file_path (str): Çıkış dosyası yolu
        
        Returns:
            bool: Başarılı mı?
        """
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(geojson, f, ensure_ascii=False, indent=2)
            print(f"✅ GeoJSON dosyası kaydedildi / GeoJSON file saved: {file_path}")
            return True
        except Exception as e:
            print(f"❌ GeoJSON kaydedilme hatası / Save error: {e}")
            return False
    
    def save_csv(self, csv_text: str, file_path: str) -> bool:
        """
        CSV'yi dosyaya kaydet
        Save CSV to file
        
        Args:
            csv_text (str): CSV metni
            file_path (str): Çıkış dosyası yolu
        
        Returns:
            bool: Başarılı mı?
        """
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(csv_text)
            print(f"✅ CSV dosyası kaydedildi / CSV file saved: {file_path}")
            return True
        except Exception as e:
            print(f"❌ CSV kaydedilme hatası / Save error: {e}")
            return False
    
    def print_statistics(self) -> None:
        """
        Veri istatistiklerini yazdır
        Print data statistics
        """
        if not self.data:
            print("❌ Veri yüklü değil / No data loaded")
            return
        
        print("\n📊 VERİ İSTATİSTİKLERİ / DATA STATISTICS")
        print("-" * 70)
        
        if isinstance(self.data, list):
            print(f"Toplam Kayıt / Total Records: {len(self.data)}")
            if self.data:
                print(f"Sütunlar / Columns: {list(self.data[0].keys())}")
        elif isinstance(self.data, dict):
            if self.data.get('type') == 'FeatureCollection':
                features = self.data.get('features', [])
                print(f"Toplam Features / Total Features: {len(features)}")
                if features:
                    print(f"İlk Feature Türü / First Feature Type: {features[0].get('geometry', {}).get('type')}")


def main():
    """
    Komut satırı arayüzü
    Command-line interface
    """
    parser = argparse.ArgumentParser(
        description='Türkiye\'nin Tam Ortası - Veri İşleme Aracı\nTurkey\'s Geographic Center - Data Processing Tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Örnekler / Examples:
  # CSV'den GeoJSON'a dönüştürme
  python data_processor.py --input data.csv --output data.geojson

  # GeoJSON'dan CSV'ye dönüştürme
  python data_processor.py --input data.geojson --output data.csv --convert csv

  # GeoJSON doğrulama
  python data_processor.py --input data.geojson --validate

  # İstatistikler gösterme
  python data_processor.py --input data.csv --stats
        '''
    )
    
    parser.add_argument('--input', '-i', help='Giriş dosyası / Input file')
    parser.add_argument('--output', '-o', help='Çıkış dosyası / Output file')
    parser.add_argument('--convert', '-c', choices=['csv', 'geojson', 'json'], 
                       help='Dönüştürülecek format / Convert to format')
    parser.add_argument('--validate', '-v', action='store_true', 
                       help='GeoJSON doğrula / Validate GeoJSON')
    parser.add_argument('--stats', '-s', action='store_true', 
                       help='İstatistikleri göster / Show statistics')
    
    args = parser.parse_args()
    
    if not args.input:
        parser.print_help()
        return
    
    processor = DataProcessor()
    
    # Dosya türünü belirle
    input_file = Path(args.input)
    file_ext = input_file.suffix.lower()
    
    print(f"\n📂 Dosya İşleniyor / Processing File: {args.input}")
    print("-" * 70)
    
    # Dosyayı yükle
    if file_ext == '.csv':
        processor.load_csv(args.input)
    elif file_ext == '.geojson' or file_ext == '.json':
        processor.load_geojson(args.input)
    else:
        print(f"❌ Desteklenmeyen dosya türü / Unsupported file type: {file_ext}")
        return
    
    # Doğrulama
    if args.validate:
        if file_ext in ['.geojson', '.json']:
            is_valid, messages = processor.validate_geojson(args.input)
            print("\n✅ DOĞRULAMA SONUÇLARI / VALIDATION RESULTS")
            for msg in messages:
                print(f"  {msg}")
        else:
            print("⚠️  CSV doğrulaması desteklenmiyor / CSV validation not supported")
    
    # Dönüştürme
    if args.convert:
        if file_ext == '.csv' and args.convert == 'geojson':
            processor.csv_to_geojson(args.input, args.output)
        elif file_ext in ['.geojson', '.json'] and args.convert == 'csv':
            processor.geojson_to_csv(args.input, args.output)
        else:
            print(f"❌ Dönüştürme desteklenmiyor / Conversion not supported: {file_ext} -> {args.convert}")
    
    # İstatistikler
    if args.stats:
        processor.print_statistics()
    
    print("\n" + "=" * 70)
    print("✅ İşlem tamamlandı / Processing completed!")
    print("=" * 70 + "\n")


if __name__ == "__main__":
    main()
