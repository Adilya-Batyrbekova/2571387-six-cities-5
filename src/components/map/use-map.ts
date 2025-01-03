import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { CityData } from '../../types';
import { ZOOM } from '../../types/constant';
import leaflet from 'leaflet';

type useMapProps = {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  currentCity: CityData;
}

export function useMap({mapRef, currentCity}: useMapProps) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.lat,
          lng: currentCity.lng,
        },
        zoom: ZOOM,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, currentCity]);

  return map;
}
