import "@/styles/login/login.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { MapProvider } from '@/contexts/MapContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MapProvider>
      <Component {...pageProps} />
      <Toaster />
    </MapProvider>
  );
}
