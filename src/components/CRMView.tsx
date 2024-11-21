import React from 'react';
import { useQuery } from 'react-query';
import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';

interface CRMViewProps {
  contactId: string;
}

const CRMView: React.FC<CRMViewProps> = ({ contactId }) => {
  const { data: contact } = useQuery(['contact', contactId], () =>
    crmService.getContactHistory(contactId)
  );

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Contact Info */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">{contact.name}</h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            {contact.phone}
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-2" />
            {contact.email}
          </div>
        </div>
      </div>

      {/* Interaction History */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Interaction History</h3>
        <div className="space-y-4">
          {contact.interactions.map((interaction: any) => (
            <div
              key={interaction.id}
              className="flex items-start p-4 bg-gray-50 rounded-lg"
            >
              {interaction.type === 'call' && <Phone className="w-5 h-5 mr-3" />}
              {interaction.type === 'email' && <Mail className="w-5 h-5 mr-3" />}
              {interaction.type === 'sms' && (
                <MessageSquare className="w-5 h-5 mr-3" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{interaction.type}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(interaction.timestamp).toLocaleString()}
                  </div>
                </div>
                {interaction.notes && (
                  <p className="mt-2 text-gray-600">{interaction.notes}</p>
                )}
                {interaction.recordingUrl && (
                  <audio
                    controls
                    className="mt-2 w-full"
                    src={interaction.recordingUrl}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMView;