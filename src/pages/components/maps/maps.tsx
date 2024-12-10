import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";
import { useMapContext } from '@/contexts/MapContext';

const Maps = ({ data }: { data: TypePostosVacinas[] }) => {
  const { selectedPosto } = useMapContext();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const rotationRef = useRef<number | null>(null);
  const activePopupRef = useRef<mapboxgl.Marker | null>(null);

  const zoomLevels = [
    { zoom: 1, count: 5 },
    { zoom: 4, count: 10 },
    { zoom: 6, count: 20 },
    { zoom: 8, count: 50 },
  ];

  const updateMarkerVisibility = (currentZoom: number) => {
    const maxVisibleMarkers = zoomLevels.reduce(
      (count, level) => (currentZoom >= level.zoom ? level.count : count),
      0
    );

    markersRef.current.forEach((marker, index) => {
      marker.getElement().style.display =
        index < maxVisibleMarkers ? "block" : "none";
    });
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_KEY_MAPS as string;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-51.09126809388414, -10.30552906770339],
        zoom: 1.5,
        pitch: 0,
        bearing: 0,
        projection: "globe",
      });

      mapRef.current.on("style.load", () => {
        mapRef.current?.setFog({
          color: "rgba(40, 40, 60, 0.5)",
          "high-color": "rgba(48, 106, 240, 0.774)",
          "horizon-blend": 0.03,
        });
        markersRef.current = data.map((posto, index) => {
          const marker = new mapboxgl.Marker().setLngLat({
            lat: parseFloat(posto.latitude),
            lng: parseFloat(posto.longitude),
          });

          const popup = new mapboxgl.Popup({ offset: 25 })
            .setDOMContent(
              (() => {
                const div = document.createElement('div');
                div.innerHTML = `
                  <div>
                    <h3 class="font-bold text-[12px] ">${posto.name}</h3>
                    <p class="text-[10px] text-gray-700">${posto.endereco}</p>
                    <div class="mt-2">
                      <h4 class="font-semibold text-[10px]">Vacinas disponíveis:</h4>
                      ${Object.values(posto.vacinas)
                        .map(
                          (vacina) => `
                          <div class="ml-2">
                            <p class="text-[10px]">${vacina.name}: ${vacina.quantidade} doses</p>
                          </div>
                        `
                        )
                        .join('')}
                    </div>
                  </div>
                `;
                return div;
              })()
            )
            .addClassName("popup");

          marker.setPopup(popup);

          marker.addTo(mapRef.current!);
          marker.getElement().style.display = "none";
          return marker;
        });

        updateMarkerVisibility(mapRef.current?.getZoom() || 0);

        const zoomThreshold = 2.3;

        const rotateGlobeLaterally = () => {
          if (!mapRef.current) return;
          const currentCenter = mapRef.current.getCenter();
          mapRef.current.setCenter([currentCenter.lng + 0.03, currentCenter.lat], {
            duration: 0,
          });
          rotationRef.current = requestAnimationFrame(rotateGlobeLaterally);
        };

        const checkZoomAndRotate = () => {
          if (!mapRef.current) return;
          const currentZoom = mapRef.current.getZoom();
          if (currentZoom < zoomThreshold && !rotationRef.current) {
            rotateGlobeLaterally();
          } else if (currentZoom >= zoomThreshold && rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
          }
        };

        mapRef.current?.on('zoomend', checkZoomAndRotate);

        checkZoomAndRotate();

        mapRef.current?.on('mousedown', () => {
          if (rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
          }
        });
      });

      mapRef.current.on("zoom", () => {
        const currentZoom = mapRef.current?.getZoom() || 0;
        updateMarkerVisibility(currentZoom);
      });

    }

    mapRef.current?.on("click", ({lngLat}) => {
      console.log("🚀 ~ Maps ~ e:", lngLat);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [data]);

  useEffect(() => {
    if (!mapRef.current || !selectedPosto) return;

    if (activePopupRef.current) {
      activePopupRef.current.getPopup()?.remove();
    }

    const marker = markersRef.current.find(
      (m) => m.getLngLat().lat === parseFloat(selectedPosto.latitude) &&
             m.getLngLat().lng === parseFloat(selectedPosto.longitude)
    );

    if (marker) {
      mapRef.current.flyTo({
        center: [parseFloat(selectedPosto.longitude), parseFloat(selectedPosto.latitude)],
        zoom: 15,
        duration: 1500
      });

      marker.togglePopup();
      activePopupRef.current = marker;
    }
  }, [selectedPosto]);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    markersRef.current = data.map((posto) => {
      const marker = new mapboxgl.Marker().setLngLat({
        lat: parseFloat(posto.latitude),
        lng: parseFloat(posto.longitude),
      });

      const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false })
        .setDOMContent(
          (() => {
            const div = document.createElement('div');
            div.innerHTML = `
              <div>
                <h3 class="font-bold text-[12px] ">${posto.name}</h3>
                <p class="text-[10px] text-gray-700">${posto.endereco}</p>
                <div class="mt-2">
                  <h4 class="font-semibold text-[10px]">Vacinas disponíveis:</h4>
                  ${Object.values(posto.vacinas)
                    .map(
                      (vacina) => `
                      <div class="ml-2">
                        <p class="text-[10px]">${vacina.name}: ${vacina.quantidade} doses</p>
                      </div>
                    `
                    )
                    .join('')}
                </div>
              </div>
            `;
            return div;
          })()
        )
        .addClassName("popup");

      marker.setPopup(popup);
      
      marker.getElement().addEventListener('click', () => {
        if (activePopupRef.current && activePopupRef.current !== marker) {
          activePopupRef.current.getPopup()?.remove();
        }
        activePopupRef.current = marker;
      });

      marker.addTo(mapRef.current!);
      marker.getElement().style.display = "none";
      return marker;
    });

    mapRef.current.on('click', (e) => {
      const target = e.originalEvent.target as HTMLElement;
      if (!target.closest('.mapboxgl-marker')) {
        if (activePopupRef.current) {
          activePopupRef.current.getPopup()?.remove();
          activePopupRef.current = null;
        }
      }
    });

    updateMarkerVisibility(mapRef.current.getZoom());
  }, [data]);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default Maps;
