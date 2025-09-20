import { memo, useCallback } from 'react';

interface SidebarBrandProps {
  logoSrc?: string;
  brandName?: string;
  onClick?: () => void;
}

function SidebarBrand({ 
  logoSrc, 
  brandName = 'ByeWind', 
  onClick 
}: SidebarBrandProps) {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick, onClick]);

  return (
    <div 
      className={`flex items-center gap-2 p-1 w-full transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:bg-gray-50 rounded-lg' : ''
      }`}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Navigate to ${brandName} home` : undefined}
    >
      <div className="flex items-center gap-2">
        <div className="w-[23px] h-6 rounded-full overflow-hidden ring-1 ring-gray-200/50 transition-shadow duration-150 hover:ring-gray-300/70">
          {logoSrc ? (
            <img 
              src={logoSrc} 
              alt={`${brandName} logo`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            /* Gradient placeholder logo with better design */
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <span className="text-white text-xs font-bold relative z-10 drop-shadow-sm">
                {brandName.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-[#1C1C1C] transition-colors duration-150 group-hover:text-gray-900">
          {brandName}
        </span>
      </div>
    </div>
  );
}

export default memo(SidebarBrand);
