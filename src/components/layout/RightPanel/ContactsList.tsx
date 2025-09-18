import type { Contact } from '../../../types';
import { mockContacts } from '../../../data';

interface ContactItemProps {
  contact: Contact;
}

function ContactItem({ contact }: ContactItemProps) {
  return (
    <div className="flex gap-2 p-1 rounded-lg">
      {/* Avatar */}
      <div className="flex items-center justify-center flex-shrink-0">
        <img 
          src={contact.avatar} 
          alt="" 
          className="w-6 h-6 rounded-full object-cover" 
        />
      </div>
      
      {/* Name */}
      <div className="flex items-center flex-1">
        <p className="text-sm font-normal text-[#1C1C1C]">
          {contact.name}
        </p>
      </div>
    </div>
  );
}

export default function ContactsList() {

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <div className="px-1 py-2">
        <h3 className="text-sm font-semibold text-[#1C1C1C]">Contacts</h3>
      </div>
      
      {/* Contact Items */}
      <div className="flex flex-col gap-2">
        {mockContacts.map((contact) => (
          <ContactItem 
            key={contact.id} 
            contact={contact} 
          />
        ))}
      </div>
    </div>
  );
}
