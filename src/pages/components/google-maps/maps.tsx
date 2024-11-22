import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Maps = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const minZoomToShowMarkers = 6;

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_KEY_MAPS as string;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-35.504750965095866, -9.419579257561125],
        zoom: 2,
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
          { lng: -35.504750965095866, lat: -9.419579257561125 },
          { lng: -35.5115275892521, lat: -9.40286198557925 },
          { lng: -35.51142852250095, lat: -9.404718958720935 },
          { lng: -35.50792816394923, lat: -9.40517505586213 },
          { lng: -35.49854984481067, lat: -9.40625013960215 },
          { lng: -35.49884704506539, lat: -9.409638260434008 },
          { lng: -35.501158602599645, lat: -9.41169066363588 },
          { lng: -35.50920463814012, lat: -9.4218229099735 },
          { lng: -35.50854419313063, lat: -9.415535534889543 },
          { lng: -35.72068621186051, lat: -9.66821733035249 },
          { lng: -35.743016131639024, lat: -9.665746500937644 },
          { lng: -35.75805464904036, lat: -9.67495586375523 },
          { lng: -35.76170035022895, lat: -9.66282640641333 },
          { lng: -35.75942178698597, lat: -9.654065970831581 },
          { lng: -35.71795193596935, lat: -9.639464738610286 },
          { lng: -35.70017914267575, lat: -9.633174782216969 },
          { lng: -35.696533441487134, lat: -9.623514978146815 },
          { lng: -35.726838332615614, lat: -9.629131176925384 },
          { lng: -35.72228120612962, lat: -9.613180928540672 },
          { lng: -35.73367402234351, lat: -9.61789868602304 },
          { lng: -35.75577608579735, lat: -9.613405585151483 },
          { lng: -35.72592690731821, lat: -9.601049250106286 },
          { lng: -35.75964964331058, lat: -9.602846563231708 },
          { lng: -35.7660296203903, lat: -9.590489842943583 },
          { lng: -35.77605529865747, lat: -9.588243118131771 },
          { lng: -35.78084028146813, lat: -9.580604142470904 },
          { lng: -35.79154952870812, lat: -9.574762456846727 },
          { lng: -35.7890431091416, lat: -9.571167523443663 },
          { lng: -35.76147249390428, lat: -9.564876298477529 },
          { lng: -35.75896607433779, lat: -9.572066260360955 },
          { lng: -35.74962396504225, lat: -9.567123177903781 },
          { lng: -35.752697827710875, lat: -9.548492233047796 },
          { lng: -35.782221362091974, lat: -9.539403178282754 },
          { lng: -35.78960224544525, lat: -9.530359676601378 },
          { lng: -35.824717357157766, lat: -9.569178865470093 },
          { lng: -35.8099555904501, lat: -9.573589856734031 },
        ];

        markersRef.current = markerPositions.map((position) => {
          const marker = new mapboxgl.Marker().setLngLat({
            lat: position.lat,
            lng: position.lng,
          });

          marker.addTo(mapRef.current!);
          marker.getElement().style.display = "none";
          return marker;
        });

        updateMarkerVisibility(mapRef.current?.getZoom() || 0);
      });

      const updateMarkerVisibility = (currentZoom: number) => {
        markersRef.current.forEach((marker) => {
          marker.getElement().style.display =
            currentZoom >= minZoomToShowMarkers ? "block" : "none";
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
        style={{ width: "60%", height: "100vh" }}
      />
  );
};

export default Maps;
