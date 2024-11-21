import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import loadScript from "./utils/load-scripts";

export default function Document() {
  useEffect(() => {
    // Carregar os scripts com Promise
    Promise.all([
      loadScript(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.1-dev/mapbox-gl-geocoder.min.js"
      ),
      loadScript("https://npmcdn.com/@turf/turf/turf.min.js"),
    ])
      .then(() => {
        console.log("Scripts carregados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao carregar os scripts", error);
      });
  }, []); // O efeito será executado apenas uma vez após o componente ser montado

  return (
    <Html lang="pt-BR">
      <Head />
      <body className="antialiased ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
