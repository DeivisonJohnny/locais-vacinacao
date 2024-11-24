import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Maps = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const zoomLevels = [
    { zoom: 1, count: 5 },
    { zoom: 4, count: 10 }, // Para zoom >= 4, mostrar 10 markers
    { zoom: 6, count: 20 }, // Para zoom >= 6, mostrar 20 markers
    { zoom: 8, count: 50 }, // Para zoom >= 8, mostrar 50 markers
  ];

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_KEY_MAPS as string;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12", // Mantendo o estilo do mapa
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

        const markerPositions = [
          {
            lng: -35.504750965095866,
            lat: -9.419579257561125,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.5115275892521,
            lat: -9.40286198557925,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.51142852250095,
            lat: -9.404718958720935,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.50792816394923,
            lat: -9.40517505586213,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.49854984481067,
            lat: -9.40625013960215,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.49884704506539,
            lat: -9.409638260434008,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.501158602599645,
            lat: -9.41169066363588,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.50920463814012,
            lat: -9.4218229099735,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.50854419313063,
            lat: -9.415535534889543,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.72068621186051,
            lat: -9.66821733035249,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.743016131639024,
            lat: -9.665746500937644,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.75805464904036,
            lat: -9.67495586375523,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.76170035022895,
            lat: -9.66282640641333,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.75942178698597,
            lat: -9.654065970831581,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.71795193596935,
            lat: -9.639464738610286,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.70017914267575,
            lat: -9.633174782216969,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.696533441487134,
            lat: -9.623514978146815,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.726838332615614,
            lat: -9.629131176925384,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.72228120612962,
            lat: -9.613180928540672,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.73367402234351,
            lat: -9.61789868602304,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.75577608579735,
            lat: -9.613405585151483,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.72592690731821,
            lat: -9.601049250106286,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.75964964331058,
            lat: -9.602846563231708,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.7660296203903,
            lat: -9.590489842943583,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.77605529865747,
            lat: -9.588243118131771,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.78084028146813,
            lat: -9.580604142470904,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.79154952870812,
            lat: -9.574762456846727,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.7890431091416,
            lat: -9.571167523443663,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.76147249390428,
            lat: -9.564876298477529,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.75896607433779,
            lat: -9.572066260360955,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.74962396504225,
            lat: -9.567123177903781,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.752697827710875,
            lat: -9.548492233047796,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.782221362091974,
            lat: -9.539403178282754,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.78960224544525,
            lat: -9.530359676601378,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.824717357157766,
            lat: -9.569178865470093,
            info: "Informações sobre o marcador 1",
          },
          {
            lng: -35.8099555904501,
            lat: -9.573589856734031,
            info: "Informações sobre o marcador 1",
          },
        ];

        markersRef.current = markerPositions.map((position, index) => {
          const marker = new mapboxgl.Marker().setLngLat({
            lat: position.lat,
            lng: position.lng,
          });

          // Adicionar o popup aos marcadores
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(position.info).addClassName("popup");

          marker.setPopup(popup); // Associando o popup ao marcador

          marker.addTo(mapRef.current!);
          marker.getElement().style.display = "none"; // Inicialmente oculto
          marker.getElement().dataset.index = `${index}`; // Usar o índice para controle

          return marker;
        });

        // Inicialize a visibilidade dos markers
        updateMarkerVisibility(mapRef.current?.getZoom() || 0);
      });

      const updateMarkerVisibility = (currentZoom: number) => {
        // Determine o número máximo de markers a ser mostrado com base no zoom
        const maxVisibleMarkers = zoomLevels.reduce(
          (count, level) => (currentZoom >= level.zoom ? level.count : count),
          0
        );

        markersRef.current.forEach((marker, index) => {
          // Controla a visibilidade dos markers com base no zoom
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