import type { WorldMapLocation } from '../data/worldMapLocations';
import { worldMapData } from '../data/worldMapLocations';

export interface CoordinateClickResult {
  x: number;
  y: number;
  isValid: boolean;
  suggestedLocation?: Partial<WorldMapLocation>;
}

export interface CoordinateFinderOptions {
  enableLogging?: boolean;
  enableClipboard?: boolean;
  showToast?: boolean;
  precision?: number;
}

/**
 * Clean utility for finding coordinates from map clicks
 */
export class CoordinateFinder {
  private options: Required<CoordinateFinderOptions>;
  private toastTimeout: number | null = null;

  constructor(options: CoordinateFinderOptions = {}) {
    this.options = {
      enableLogging: options.enableLogging ?? true,
      enableClipboard: options.enableClipboard ?? true,
      showToast: options.showToast ?? true,
      precision: options.precision ?? 2
    };
  }

  /**
   * Calculate coordinates from click event
   */
  getCoordinatesFromClick(
    event: React.MouseEvent<HTMLElement>,
    mapElement: HTMLElement
  ): CoordinateClickResult {
    const rect = mapElement.getBoundingClientRect();
    const scaleX = worldMapData.viewBox.width / rect.width;
    const scaleY = worldMapData.viewBox.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX * Math.pow(10, this.options.precision)) / Math.pow(10, this.options.precision);
    const y = Math.round((event.clientY - rect.top) * scaleY * Math.pow(10, this.options.precision)) / Math.pow(10, this.options.precision);
    
    const isValid = this.validateCoordinates(x, y);
    
    const result: CoordinateClickResult = {
      x,
      y,
      isValid,
      suggestedLocation: this.generateSuggestedLocation(x, y)
    };

    // Handle side effects based on options
    if (this.options.enableLogging) {
      this.logCoordinates(result);
    }

    if (this.options.enableClipboard && isValid) {
      this.copyToClipboard(result);
    }

    if (this.options.showToast && isValid) {
      this.showCoordinateToast(result);
    }

    return result;
  }

  /**
   * Validate coordinates are within map bounds
   */
  private validateCoordinates(x: number, y: number): boolean {
    return (
      x >= 0 && 
      x <= worldMapData.viewBox.width && 
      y >= 0 && 
      y <= worldMapData.viewBox.height
    );
  }

  /**
   * Generate a suggested location object
   */
  private generateSuggestedLocation(x: number, y: number): Partial<WorldMapLocation> {
    return {
      coordinates: { x, y },
      color: "#1C1C1C",
      isActive: true,
      progress: 75 // Default progress value
    };
  }

  /**
   * Log coordinates to console in a clean format
   */
  private logCoordinates(result: CoordinateClickResult): void {
    console.group('🎯 Coordinate Finder');
    console.log('📍 Position:', result.x, result.y);
    console.log('✅ Valid:', result.isValid ? 'Yes' : 'No');
    
    if (result.isValid) {
      console.log('📋 Copy this location object:');
      const locationTemplate = {
        id: "new-location",
        name: "Location Name",
        coordinates: { x: result.x, y: result.y },
        country: "Country",
        value: "$XX,XXX",
        progress: 75,
        revenue: 50000,
        color: "#1C1C1C",
        isActive: true
      };
      console.log(JSON.stringify(locationTemplate, null, 2));
    } else {
      console.warn('❌ Coordinates are outside map bounds');
    }
    console.groupEnd();
  }

  /**
   * Copy coordinates to clipboard
   */
  private async copyToClipboard(result: CoordinateClickResult): Promise<void> {
    if (!result.isValid) return;
    
    const coordinateString = `coordinates: { x: ${result.x}, y: ${result.y} },`;
    
    try {
      await navigator.clipboard.writeText(coordinateString);
      console.log('📋 Coordinates copied to clipboard!');
    } catch (err) {
      console.warn('📋 Could not copy to clipboard:', err);
    }
  }

  /**
   * Show temporary toast notification
   */
  private showCoordinateToast(result: CoordinateClickResult): void {
    // Remove existing toast
    this.removeToast();

    const toast = document.createElement('div');
    toast.id = 'coordinate-toast';
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      ">
        <div style="font-weight: 600; margin-bottom: 4px;">📍 Coordinates Found</div>
        <div style="font-family: monospace; color: #a0a0a0;">x: ${result.x}, y: ${result.y}</div>
        <div style="font-size: 12px; color: #a0a0a0; margin-top: 4px;">Copied to clipboard!</div>
      </div>
    `;

    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.removeToast();
    }, 3000);
  }

  /**
   * Remove coordinate toast
   */
  private removeToast(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    const existingToast = document.getElementById('coordinate-toast');
    if (existingToast) {
      existingToast.style.opacity = '0';
      setTimeout(() => {
        existingToast.remove();
      }, 300);
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.removeToast();
  }
}

/**
 * Default instance for easy usage
 */
export const defaultCoordinateFinder = new CoordinateFinder({
  enableLogging: true,
  enableClipboard: true,
  showToast: true,
  precision: 2
});

/**
 * Quick utility function for simple usage
 */
export const getMapCoordinates = (
  event: React.MouseEvent<HTMLElement>,
  mapElement: HTMLElement
): CoordinateClickResult => {
  return defaultCoordinateFinder.getCoordinatesFromClick(event, mapElement);
};

/**
 * Validate if coordinates are within map bounds
 */
export const isValidMapCoordinates = (x: number, y: number): boolean => {
  return (
    x >= 0 && 
    x <= worldMapData.viewBox.width && 
    y >= 0 && 
    y <= worldMapData.viewBox.height
  );
};

/**
 * Check if dev mode is enabled
 */
export const isDevMode = (): boolean => {
  return import.meta.env.VITE_DEV_MODE === 'true';
};
