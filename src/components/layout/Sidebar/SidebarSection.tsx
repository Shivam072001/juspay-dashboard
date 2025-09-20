import { memo } from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import type { SidebarSection as Section } from '../../../data/sidebarData';

interface SidebarSectionProps {
  section: Section;
}

function SidebarSection({ section }: SidebarSectionProps) {
  return (
    <section className="mb-4" aria-labelledby={section.title ? `section-${section.id}` : undefined}>
      {/* Section Title */}
      {section.title && (
        <div className="px-3 py-1 mb-1">
          <h3 
            id={`section-${section.id}`}
            className="text-sm font-normal text-[rgba(28,28,28,0.4)] transition-colors duration-150"
          >
            {section.title}
          </h3>
        </div>
      )}
      
      {/* Section Items */}
      <nav 
        className="space-y-1"
        role="navigation"
        aria-label={section.title || 'Navigation menu'}
      >
        {section.items.map((item) => (
          <SidebarMenuItem 
            key={item.id} 
            item={item} 
          />
        ))}
      </nav>
    </section>
  );
}

export default memo(SidebarSection, (prevProps, nextProps) => {
  // Deep comparison of section items to prevent unnecessary re-renders
  const prevItems = prevProps.section.items;
  const nextItems = nextProps.section.items;
  
  if (prevItems.length !== nextItems.length) return false;
  
  return prevItems.every((item, index) => {
    const nextItem = nextItems[index];
    return (
      item.id === nextItem.id &&
      item.isActive === nextItem.isActive &&
      item.isExpanded === nextItem.isExpanded
    );
  });
});
