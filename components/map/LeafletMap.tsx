'use client';
import { useEffect, useRef } from 'react';
import { mapLocations } from '@/lib/data';

export default function VeldtoneMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current) return;

    // Dynamic import Leaflet (SSR safe)
    import('leaflet').then(L => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      // Create map centred on Southern Africa
      const map = L.map(mapRef.current, {
        center: [-28.5, 24.5],
        zoom: 5,
        zoomControl: true,
        attributionControl: true,
      });

      // OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Custom pin icon
      const makeIcon = (isNew: boolean) => L.divIcon({
        className: '',
        html: `
          <div style="
            width: 14px; height: 14px;
            background: ${isNew ? '#8FA882' : '#8B4A2A'};
            border: 2px solid #FAF6EE;
            border-radius: 50%;
            box-shadow: 0 0 0 4px ${isNew ? 'rgba(143,168,130,0.25)' : 'rgba(139,74,42,0.25)'};
            position: relative;
          ">
            <div style="
              position: absolute; top: 50%; left: 50%;
              transform: translate(-50%,-50%);
              width: 4px; height: 4px;
              background: #FAF6EE; border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -12],
      });

      // Add pins
      mapLocations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], { icon: makeIcon(loc.isNew) });

        const popupContent = `
          <div style="padding: 4px 0; min-width: 200px;">
            <div style="
              font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase;
              color: ${loc.isNew ? '#8FA882' : '#8B4A2A'};
              font-family: 'Courier Prime', monospace;
              margin-bottom: 8px;
            ">${loc.isNew ? '◆ New this season' : '◎ Archive'}</div>
            <div style="
              font-family: 'Playfair Display', serif;
              font-size: 16px; font-weight: 700;
              color: #FAF6EE; line-height: 1.2;
              margin-bottom: 6px;
            ">${loc.title}</div>
            <div style="
              font-family: 'Courier Prime', monospace;
              font-size: 9px; letter-spacing: 0.15em;
              text-transform: uppercase; color: #8FA882;
            ">◎ ${loc.loc}</div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          closeButton: true,
        });

        marker.addTo(map);

        // Pulse animation via CSS class on the icon element
        marker.on('add', () => {
          const el = marker.getElement();
          if (el) {
            el.style.transition = 'transform 0.2s';
            el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.4)');
            el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
          }
        });
      });

      mapInstanceRef.current = map;
    });

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} style={{
      width: '100%',
      height: '60vh',
      minHeight: 480,
      position: 'relative',
    }} />
  );
}
