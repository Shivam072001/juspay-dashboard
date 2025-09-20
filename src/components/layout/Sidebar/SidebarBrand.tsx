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
      className={`flex items-center gap-2 p-1 w-full theme-transition ${
        onClick ? 'cursor-pointer rounded-lg' : ''
      }`}
      onMouseEnter={onClick ? (e) => e.currentTarget.style.backgroundColor = 'var(--color-sidebar-bg-hover)' : undefined}
      onMouseLeave={onClick ? (e) => e.currentTarget.style.backgroundColor = 'transparent' : undefined}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Navigate to ${brandName} home` : undefined}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-[24px] h-6 rounded-[80px] overflow-hidden ring-1 theme-transition"
          style={{ 
            '--tw-ring-color': 'var(--color-sidebar-border)',
          } as React.CSSProperties}
        >
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
        <span className="text-[14px] font-[400] theme-transition" style={{ lineHeight: '1.4285714285714286em', color: 'var(--color-sidebar-text-primary)' }}>
          {brandName}
        </span>
      </div>
    </div>
  );
}

export default memo(SidebarBrand);
