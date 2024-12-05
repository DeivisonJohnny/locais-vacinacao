import { createContext, useContext, useState } from 'react';
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";

type MapContextType = {
  selectedPosto: TypePostosVacinas | null;
  setSelectedPosto: (posto: TypePostosVacinas | null) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [selectedPosto, setSelectedPosto] = useState<TypePostosVacinas | null>(null);

  return (
    <MapContext.Provider value={{ selectedPosto, setSelectedPosto }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext deve ser usado dentro de um MapProvider');
  }
  return context;
} 