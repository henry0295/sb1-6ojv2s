interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  lastContact?: Date;
  notes?: string;
}

interface Interaction {
  id: string;
  contactId: string;
  type: 'call' | 'email' | 'sms';
  timestamp: Date;
  duration?: number;
  notes?: string;
  recordingUrl?: string;
}

class CRMService {
  async createContact(contact: Omit<Contact, 'id'>) {
    try {
      const result = await fetch('/api/crm/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      return await result.json();
    } catch (error) {
      console.error('Failed to create contact:', error);
      return { success: false, error };
    }
  }

  async logInteraction(interaction: Omit<Interaction, 'id'>) {
    try {
      const result = await fetch('/api/crm/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interaction),
      });
      return await result.json();
    } catch (error) {
      console.error('Failed to log interaction:', error);
      return { success: false, error };
    }
  }

  async getContactHistory(contactId: string) {
    try {
      const result = await fetch(`/api/crm/contacts/${contactId}/history`);
      return await result.json();
    } catch (error) {
      console.error('Failed to fetch contact history:', error);
      return { success: false, error };
    }
  }
}

export const crmService = new CRMService();