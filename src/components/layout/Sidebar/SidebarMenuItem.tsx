import { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSidebarMenu } from '../../../hooks/useSidebarMenu';
import type { SidebarMenuItem as MenuItem } from '../../../data/sidebarData';

interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
}

// Icon component memoized for performance
const MenuIcon = memo(({ icon, label }: { icon?: string; label: string }) => {
  if (!icon) return null;

  if (icon === 'dot') {
    return (
      <div className="flex items-center justify-center w-5 h-5">
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full transition-colors duration-200 hover:bg-gray-400"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-5 h-5">
      <img 
        src={icon} 
        alt={label} 
        width="20" 
        height="20"
        className="transition-opacity duration-200 hover:opacity-80"
        loading="lazy"
      />
    </div>
  );
});

MenuIcon.displayName = 'MenuIcon';

// Dropdown arrow component
const DropdownArrow = memo(({ isExpanded }: { isExpanded: boolean }) => (
  <div className="flex items-center justify-center w-4 h-4 absolute left-0 top-1/2 transform -translate-y-1/2">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
));

DropdownArrow.displayName = 'DropdownArrow';

function SidebarMenuItem({ item, level = 0 }: SidebarMenuItemProps) {
  const { toggleMenuItem, setActiveItem, isItemExpanded } = useSidebarMenu();
  const itemRef = useRef<HTMLDivElement>(null);

  const isExpanded = useMemo(() => 
    item.hasDropdown ? isItemExpanded(item.id) : false, 
    [item.hasDropdown, item.id, isItemExpanded]
  );

  const hasChildren = useMemo(() => 
    Boolean(item.children && item.children.length > 0), 
    [item.children]
  );

  // Optimized click handler
  const handleClick = useCallback(() => {
    if (item.hasDropdown) {
      toggleMenuItem(item.id);
    } else {
      setActiveItem(item.id);
    }
  }, [item.hasDropdown, item.id, toggleMenuItem, setActiveItem]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleClick();
        break;
      case 'ArrowRight':
        if (item.hasDropdown && !isExpanded) {
          event.preventDefault();
          toggleMenuItem(item.id);
        }
        break;
      case 'ArrowLeft':
        if (item.hasDropdown && isExpanded) {
          event.preventDefault();
          toggleMenuItem(item.id);
        }
        break;
    }
  }, [handleClick, item.hasDropdown, item.id, isExpanded, toggleMenuItem]);

  // Auto-focus on active item
  useEffect(() => {
    if (item.isActive && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible) {
        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [item.isActive]);

  // Dynamic styles based on level
  const itemStyles = useMemo(() => ({
    paddingLeft: level > 0 ? `${level * 16 + 8}px` : '8px'
  }), [level]);

  const itemClassNames = useMemo(() => [
    'flex items-center gap-1 px-2 py-1 rounded-lg relative cursor-pointer',
    'transition-all duration-150 ease-in-out',
    'hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
    'group',
    item.isActive ? 'bg-[rgba(28,28,28,0.05)]' : ''
  ].filter(Boolean).join(' '), [item.isActive]);

  return (
    <>
      {/* Main menu item */}
      <div 
        ref={itemRef}
        className={itemClassNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={itemStyles}
        role="button"
        tabIndex={0}
        aria-expanded={item.hasDropdown ? isExpanded : undefined}
        aria-label={`${item.label}${item.hasDropdown ? `, ${isExpanded ? 'expanded' : 'collapsed'}` : ''}`}
        aria-current={item.isActive ? 'page' : undefined}
      >
        {/* Active indicator */}
        {item.isActive && level === 0 && (
          <div 
            className="w-1 h-4 bg-[#1C1C1C] rounded-sm absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200"
            aria-hidden="true"
          />
        )}
        
        {/* Dropdown arrow */}
        {item.hasDropdown && level === 0 && (
          <DropdownArrow isExpanded={isExpanded} />
        )}
        
        {/* Content */}
        <div className={`flex items-center gap-1 ${level === 0 && (item.hasDropdown || item.isActive) ? 'ml-3' : ''}`}>
          <MenuIcon icon={item.icon} label={item.label} />
          
          {/* Label */}
          <span className="text-sm font-normal text-[#1C1C1C] group-hover:text-gray-900 transition-colors duration-150">
            {item.label}
          </span>
        </div>
      </div>

      {/* Children/Submenu items with optimized animation */}
      {hasChildren && (
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="group"
          aria-hidden={!isExpanded}
        >
          <div className={`space-y-1 transition-all duration-200 ${isExpanded ? 'mt-1 ml-7' : 'ml-0'}`}>
            {item.children?.map((child) => (
              <SidebarMenuItem 
                key={child.id} 
                item={child} 
                level={level + 1} 
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Memoize the component for performance
export default memo(SidebarMenuItem, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.isActive === nextProps.item.isActive &&
    prevProps.item.isExpanded === nextProps.item.isExpanded &&
    prevProps.level === nextProps.level
  );
});
