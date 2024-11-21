import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Maps = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_KEY_MAPS as string;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-satellite", // Estilo de satélite para simular espaço
        center: [-74.5, 40], // Coordenadas de centro
        zoom: 2, // Nível de zoom inicial (baixo para ver o globo)
        pitch: 0, // Desabilita a inclinação inicial
        bearing: 0, // Orientação inicial do mapa
        projection: "globe", // Ativa a projeção do globo
      });

      // Configurar o globo para mostrar bordas e efeitos de luz
      mapRef.current.on("style.load", () => {
        mapRef.current?.setFog({
          color: "rgba(40, 40, 60, 0.5)", // Cor do nevoeiro
          "high-color": "rgba(48, 106, 240, 0.774)", // Brilho nas áreas altas
          "horizon-blend": 0.1, // Mistura na linha do horizonte
        });
      });
    }

    // Cleanup: removendo o mapa quando o componente for desmontado
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default Maps;
