'use client';

import React, { useEffect, useRef } from 'react';

export const OfficeMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load leaflet stylesheet dynamically if not present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Import leaflet dynamically
    import('leaflet').then((L) => {
      if (!mapRef.current) return;
      if ((mapRef.current as any)._leaflet_id) return;

      const map = L.map(mapRef.current).setView([9.9196, 78.1394], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      L.marker([9.9196, 78.1394])
        .addTo(map)
        .bindPopup(
          '<b>Kopuram Promoter and Builders LLP</b><br>Anna Nagar, Madurai'
        )
        .openPopup();
    });
  }, []);

  return (
    <div
      ref={mapRef}
      id="office-map"
      className="h-[380px] w-full rounded-xl overflow-hidden border border-[var(--border-color)] shadow-md"
    />
  );
};
