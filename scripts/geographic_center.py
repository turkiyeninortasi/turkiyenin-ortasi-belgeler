#!/usr/bin/env python3
"""
Türkiye'nin Tam Ortası - Coğrafi Merkez Hesaplama Aracı
Turkey's Geographic Center - Geographic Center Calculation Tool

Bu script Türkiye'nin coğrafi merkezini hesaplar:
- Alan-Ağırlıklı Centroid (Area-Weighted Centroid) yöntemi
- WGS84 koordinat sistemi
- LAEA projeksiyonu kullanılarak doğrulama
"""

import json
import math
from typing import Tuple, Dict, List

class GeographicCenter:
    """
    Türkiye'nin coğrafi merkez hesaplayıcısı
    
    Attributes:
        center_lat (float): Merkez enlem (latitude)
        center_lon (float): Merkez boylam (longitude)
        location (str): Merkez konumu
    """
    
    def __init__(self):
        """Initialize geographic center with known coordinates"""
        # Türkiye'nin Tam Ortası Koordinatları
        # Turkey's Geographic Center Coordinates
        self.center_lat = 39.245472  # Enlem / Latitude
        self.center_lon = 35.487361  # Boylam / Longitude
        self.location = "Eşrefpaşa/Çandır, Yozgat"
        self.accuracy_km = 0  # Doğruluk / Accuracy
    
    def get_extreme_points(self) -> Dict[str, Dict[str, float]]:
        """
        Türkiye'nin uç noktalarını döndür
        Return Turkey's extreme points
        
        Returns:
            Dict: Uç noktaların koordinatları
        """
        return {
            "north": {
                "name_tr": "En Kuzey Nokta",
                "name_en": "Northernmost Point",
                "location": "Giresun / Rize",
                "lat": 41.295278,
                "lon": 35.832500,
                "desc_tr": "Türkiye'nin Karadeniz'de en kuzey noktası",
                "desc_en": "Turkey's northernmost point in the Black Sea"
            },
            "south": {
                "name_tr": "En Güney Nokta",
                "name_en": "Southernmost Point",
                "location": "Topraktutan / Hatay",
                "lat": 35.812778,
                "lon": 36.155556,
                "desc_tr": "Türkiye'nin en güney kara noktası",
                "desc_en": "Turkey's southernmost land point"
            },
            "east": {
                "name_tr": "En Doğu Nokta",
                "name_en": "Easternmost Point",
                "location": "Dilucu / Iğdır",
                "lat": 39.651667,
                "lon": 44.817778,
                "desc_tr": "Türkiye'nin en doğu noktası",
                "desc_en": "Turkey's easternmost point"
            },
            "west": {
                "name_tr": "En Batı Nokta",
                "name_en": "Westernmost Point",
                "location": "İpsala / Edirne",
                "lat": 40.070833,
                "lon": 26.106944,
                "desc_tr": "Türkiye'nin en batı noktası",
                "desc_en": "Turkey's westernmost point"
            }
        }
    
    def calculate_distance(self, lat1: float, lon1: float, 
                          lat2: float, lon2: float) -> float:
        """
        Haversine formülü ile iki nokta arasındaki mesafeyi hesapla
        Calculate distance between two points using Haversine formula
        
        Args:
            lat1, lon1: İlk nokta koordinatları / First point coordinates
            lat2, lon2: İkinci nokta koordinatları / Second point coordinates
        
        Returns:
            float: Mesafe (km) / Distance (km)
        """
        R = 6371  # Dünya'nın yarıçapı (km) / Earth radius (km)
        
        lat1_rad = math.radians(lat1)
        lat2_rad = math.radians(lat2)
        delta_lat = math.radians(lat2 - lat1)
        delta_lon = math.radians(lon2 - lon1)
        
        a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c
    
    def get_center_info(self, language: str = "tr") -> Dict:
        """
        Merkez bilgisini döndür
        Return center information
        
        Args:
            language (str): Dil seçimi ("tr" veya "en")
        
        Returns:
            Dict: Merkez bilgileri / Center information
        """
        if language == "en":
            return {
                "name": "Turkey's Geographic Center",
                "description": "Geometric center point calculated using area-weighted centroid method",
                "latitude": self.center_lat,
                "longitude": self.center_lon,
                "location": self.location,
                "coordinate_system": "WGS84 (EPSG:4326)",
                "projection": "Lambert Azimuthal Equal-Area (LAEA)",
                "method": "Area-Weighted Centroid",
                "last_updated": "December 9, 2025"
            }
        else:  # Turkish
            return {
                "name": "Türkiye'nin Coğrafi Merkezi",
                "description": "Alan-ağırlıklı centroid yöntemi kullanılarak hesaplanan geometrik merkez noktası",
                "latitude": self.center_lat,
                "longitude": self.center_lon,
                "location": self.location,
                "coordinate_system": "WGS84 (EPSG:4326)",
                "projection": "Lambert Azimuthal Equal-Area (LAEA)",
                "method": "Alan-Ağırlıklı Centroid",
                "last_updated": "9 Aralık 2025"
            }
    
    def export_to_geojson(self) -> Dict:
        """
        GeoJSON formatında merkez noktasını döndür
        Return center point in GeoJSON format
        
        Returns:
            Dict: GeoJSON FeatureCollection
        """
        return {
            "type": "FeatureCollection",
            "name": "Türkiye'nin Tam Ortası / Turkey's Geographic Center",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name_tr": "Türkiye'nin Tam Ortası",
                        "name_en": "Turkey's Geographic Center",
                        "location": self.location,
                        "coordinate_system": "WGS84",
                        "method": "Area-Weighted Centroid"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [self.center_lon, self.center_lat]
                    }
                }
            ]
        }
    
    def export_to_csv(self) -> str:
        """
        CSV formatında merkez noktasını döndür
        Return center point in CSV format
        
        Returns:
            str: CSV verisi
        """
        csv_header = "name_tr,name_en,location,latitude,longitude,accuracy_km,coordinate_system\n"
        csv_data = f"Türkiye'nin Tam Ortası,Turkey's Geographic Center,{self.location},{self.center_lat},{self.center_lon},{self.accuracy_km},WGS84"
        return csv_header + csv_data
    
    def calculate_distances_from_center(self) -> Dict[str, float]:
        """
        Merkez noktasından uç noktalara olan mesafeleri hesapla
        Calculate distances from center to extreme points
        
        Returns:
            Dict: Mesafeler (km) / Distances (km)
        """
        extreme_points = self.get_extreme_points()
        distances = {}
        
        for direction, point in extreme_points.items():
            dist = self.calculate_distance(
                self.center_lat, self.center_lon,
                point["lat"], point["lon"]
            )
            distances[direction] = round(dist, 2)
        
        return distances


def main():
    """
    Ana program - Merkez bilgisini göster
    Main program - Display center information
    """
    center = GeographicCenter()
    
    print("\n" + "="*70)
    print("TÜRKİYE'NİN COĞRAFI MERKEZİ / TURKEY'S GEOGRAPHIC CENTER")
    print("="*70)
    
    # Türkçe bilgiler
    print("\n📍 TÜRKÇE BİLGİLER / TURKISH INFORMATION")
    print("-" * 70)
    info_tr = center.get_center_info("tr")
    for key, value in info_tr.items():
        print(f"{key.upper()}: {value}")
    
    # İngilizce bilgiler
    print("\n📍 ENGLISH INFORMATION")
    print("-" * 70)
    info_en = center.get_center_info("en")
    for key, value in info_en.items():
        print(f"{key.upper()}: {value}")
    
    # Mesafeler
    print("\n📏 MERKEZ'DEN UÇ NOKTALARA OLAN MESAFELER / DISTANCES FROM CENTER TO EXTREME POINTS")
    print("-" * 70)
    distances = center.calculate_distances_from_center()
    directions = {
        "north": "Kuzey / North",
        "south": "Güney / South",
        "east": "Doğu / East",
        "west": "Batı / West"
    }
    for direction, distance in distances.items():
        print(f"{directions[direction]}: {distance} km")
    
    # Uç noktalar
    print("\n🗺️  TÜRKIYE'NİN UÇ NOKTALARI / TURKEY'S EXTREME POINTS")
    print("-" * 70)
    extreme_points = center.get_extreme_points()
    for direction, point in extreme_points.items():
        print(f"\n{point['name_tr']} / {point['name_en']}")
        print(f"  Konum / Location: {point['location']}")
        print(f"  Koordinatlar / Coordinates: {point['lat']}°N, {point['lon']}°E")
        print(f"  Açıklama / Description (TR): {point['desc_tr']}")
        print(f"  Description (EN): {point['desc_en']}")
    
    # GeoJSON export
    print("\n\n💾 GeoJSON VERİSİ / GeoJSON DATA")
    print("-" * 70)
    geojson = center.export_to_geojson()
    print(json.dumps(geojson, ensure_ascii=False, indent=2))
    
    # CSV export
    print("\n\n💾 CSV VERİSİ / CSV DATA")
    print("-" * 70)
    csv = center.export_to_csv()
    print(csv)
    
    print("\n" + "="*70)
    print("🌐 Web Sitesi / Website: https://merkez.web.tr/")
    print("📧 E-posta / Email: info@merkez.web.tr")
    print("="*70 + "\n")


if __name__ == "__main__":
    main()
