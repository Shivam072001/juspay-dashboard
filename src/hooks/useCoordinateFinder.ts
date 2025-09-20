import { useState, useCallback } from 'react';

// Hook for easier coordinate finder integration
export const useCoordinateFinder = (viewBox: { width: number; height: number }) => {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);
  
  const handleCoordinateFound = useCallback((coords: { x: number; y: number }) => {
    setCoordinates(coords);
    console.log('🎯 New coordinates found:', coords);
  }, []);
  
  return {
    coordinates,
    handleCoordinateFound,
    viewBox
  };
};
