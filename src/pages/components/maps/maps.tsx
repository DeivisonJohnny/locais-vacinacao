import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";

const Maps = () => {
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

        const data: TypePostosVacinas[] = [
          {
            id: 1,
            nome: "Posto 1",
            endereco: "Avenida Paulista, 1000, São Paulo, SP",
            latitude: "-23.561684",
            longitude: "-46.656139",
            vacinas: {
              vacina1: {
                quantidade: 100,
                descricao: "Vacina contra gripe",
                id: 1,
                tipo: "Injeção",
                nome: "Influenza",
              },
              vacina2: {
                quantidade: 200,
                descricao: "Vacina contra Covid-19",
                id: 2,
                tipo: "Injeção",
                nome: "CoronaVac",
              },
            },
          },
          {
            id: 2,
            nome: "Posto 2",
            endereco: "Rua 25 de Março, 200, São Paulo, SP",
            latitude: "-23.547501",
            longitude: "-46.635683",
            vacinas: {
              vacina3: {
                quantidade: 50,
                descricao: "Vacina contra hepatite B",
                id: 3,
                tipo: "Injeção",
                nome: "Hepatite B",
              },
              vacina4: {
                quantidade: 75,
                descricao: "Vacina contra sarampo",
                id: 4,
                tipo: "Injeção",
                nome: "Sarampo",
              },
            },
          },
          {
            id: 3,
            nome: "Posto 3",
            endereco: "Rua dos Três Irmãos, 350, São Paulo, SP",
            latitude: "-23.590453",
            longitude: "-46.635778",
            vacinas: {
              vacina5: {
                quantidade: 30,
                descricao: "Vacina contra febre amarela",
                id: 5,
                tipo: "Injeção",
                nome: "Febre Amarela",
              },
            },
          },
          {
            id: 4,
            nome: "Posto 4",
            endereco: "Avenida Rio Branco, 500, Rio de Janeiro, RJ",
            latitude: "-22.903539",
            longitude: "-43.188965",
            vacinas: {
              vacina1: {
                quantidade: 150,
                descricao: "Vacina contra gripe",
                id: 1,
                tipo: "Injeção",
                nome: "Influenza",
              },
            },
          },
          {
            id: 5,
            nome: "Posto 5",
            endereco: "Rua das Flores, 100, Belo Horizonte, MG",
            latitude: "-19.921319",
            longitude: "-43.937993",
            vacinas: {
              vacina2: {
                quantidade: 120,
                descricao: "Vacina contra Covid-19",
                id: 2,
                tipo: "Injeção",
                nome: "CoronaVac",
              },
            },
          },
        ];

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
                    <h3 class="font-bold text-[12px] ">${posto.nome}</h3>
                    <p class="text-[10px] text-gray-700">${posto.endereco}</p>
                    <div class="mt-2">
                      <h4 class="font-semibold text-[10px]">Vacinas disponíveis:</h4>
                      ${Object.values(posto.vacinas)
                        .map(
                          (vacina) => `
                          <div class="ml-2">
                            <p class="text-[10px]">${vacina.nome}: ${vacina.quantidade} doses</p>
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

      mapRef.current.on("click", (event) => {
        console.log("🚀 ~ mapRef.current.on ~ event:", event.lngLat);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default Maps;
