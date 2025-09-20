import { useState, useCallback } from 'react';

interface CoordinateFinderProps {
  viewBox: { width: number; height: number };
  onCoordinateFound?: (coordinates: { x: number; y: number }) => void;
}

interface Coordinates {
  x: number;
  y: number;
}

export default function CoordinateFinder({ viewBox, onCoordinateFound }: CoordinateFinderProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState<Coordinates | null>(null);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  // Calculate coordinates from click event
  const calculateCoordinates = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Calculate scale factors
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;
    
    // Calculate coordinates
    const x = Math.round((event.clientX - rect.left) * scaleX * 100) / 100;
    const y = Math.round((event.clientY - rect.top) * scaleY * 100) / 100;
    
    return { x, y };
  }, [viewBox]);

  // Handle map click
  const handleMapClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!isEnabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const coordinates = calculateCoordinates(event);
    setLastCoordinates(coordinates);
    onCoordinateFound?.(coordinates);
  }, [isEnabled, calculateCoordinates, onCoordinateFound]);

  // Copy coordinates to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!lastCoordinates) return;
    
    const coordinateString = `coordinates: { x: ${lastCoordinates.x}, y: ${lastCoordinates.y} },`;
    
    try {
      await navigator.clipboard.writeText(coordinateString);
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    } catch {
      console.error('Failed to copy coordinates');
      // Fallback: log to console
      console.log('📋 Copy this:', coordinateString);
    }
  }, [lastCoordinates]);

  // Generate location template
  const generateLocationTemplate = useCallback(() => {
    if (!lastCoordinates) return;
    
    const template = `{
  id: "new-location",
  name: "New Location",
  coordinates: { x: ${lastCoordinates.x}, y: ${lastCoordinates.y} },
  country: "Country Name",
  value: "$XX,XXX",
  progress: 75,
  revenue: 75000,
  color: "#1C1C1C",
  isActive: true
}`;
    
    try {
      navigator.clipboard.writeText(template);
      console.log('📋 Location template copied to clipboard!');
      console.log(template);
    } catch {
      console.log('📋 Copy this template:', template);
    }
  }, [lastCoordinates]);

  // Only render in dev mode
  if (import.meta.env.VITE_DEV_MODE !== 'true') {
    return null;
  }

  return (
    <>
      {/* Invisible overlay for capturing clicks */}
      {isEnabled && (
        <div 
          className="absolute inset-0 cursor-crosshair z-10"
          onClick={handleMapClick}
          title="Click anywhere to get coordinates"
        />
      )}
      
      {/* Control Panel - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card shadow-lg rounded-lg border border-border p-3 min-w-[250px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-foreground">Coordinate Finder</h3>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                isEnabled 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-muted text-muted-foreground border border-border'
              }`}
            >
              {isEnabled ? '✅ Enabled' : '❌ Disabled'}
            </button>
          </div>
          
          {/* Instructions */}
          <div className="text-xs text-gray-500 mb-3">
            {isEnabled ? (
              <div className="text-green-600">
                🎯 Click anywhere on the map to get coordinates
              </div>
            ) : (
              'Enable to find coordinates by clicking on the map'
            )}
          </div>
          
          {/* Coordinates Display */}
          {lastCoordinates && (
            <div className="space-y-2">
              <div className="bg-muted p-2 rounded text-xs font-mono">
                <div className="text-muted-foreground">Coordinates:</div>
                <div className="text-foreground font-semibold">
                  x: {lastCoordinates.x}, y: {lastCoordinates.y}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground text-xs px-3 py-1.5 rounded transition-colors"
                >
                  {showCopiedFeedback ? '✅ Copied!' : '📋 Copy Coords'}
                </button>
                <button
                  onClick={generateLocationTemplate}
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-primary-foreground text-xs px-3 py-1.5 rounded transition-colors"
                >
                  📝 Template
                </button>
              </div>
            </div>
          )}
          
          {/* Usage Hint */}
          <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-400">
            💡 Tip: Use "Template" to get complete location object
          </div>
        </div>
      </div>
    </>
  );
}

