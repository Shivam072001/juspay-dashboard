import { memo, useCallback } from 'react';
import GenericList from './GenericList';
import type { Contact } from '../../../types/rightPanel';

interface ContactsListProps {
  onContactClick?: (contact: Contact) => void;
  onContactDoubleClick?: (contact: Contact) => void;
  className?: string;
}

function ContactsList({
  onContactClick,
  onContactDoubleClick,
  className
}: ContactsListProps) {
  // Handle contact click with proper typing
  const handleItemClick = useCallback((item: Contact | any) => {
    if ('name' in item && 'avatar' in item) {
      onContactClick?.(item as Contact);
    }
  }, [onContactClick]);

  // Handle contact double-click with proper typing
  const handleItemDoubleClick = useCallback((item: Contact | any) => {
    if ('name' in item && 'avatar' in item) {
      onContactDoubleClick?.(item as Contact);
    }
  }, [onContactDoubleClick]);

  return (
    <GenericList
      type="contacts"
      title="Contacts"
      showCount={false}
      showClearAll={false}
      onItemClick={handleItemClick}
      onItemDoubleClick={handleItemDoubleClick}
      className={className}
      emptyStateMessage="No contacts available"
    />
  );
}

export default memo(ContactsList);
