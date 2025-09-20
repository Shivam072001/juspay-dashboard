export interface Coordinates {
  x: number;
  y: number;
}

export interface CoordinateFinderProps {
  viewBox: { width: number; height: number };
  onCoordinateFound?: (coordinates: Coordinates) => void;
}

export interface CoordinateFinderState {
  isEnabled: boolean;
  lastCoordinates: Coordinates | null;
  showCopiedFeedback: boolean;
}
