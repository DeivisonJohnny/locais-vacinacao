import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";

const Maps = ({ data }: { data: TypePostosVacinas[] }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const zoomLevels = [
    { zoom: 1, count: 5 },
    { zoom: 4, count: 10 },
    { zoom: 6, count: 20 },
    { zoom: 8, count: 50 },
  ];

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
      });

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

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default Maps;
