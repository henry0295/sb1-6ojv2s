export interface Agent {
  id: string;
  name: string;
  email: string;
  extension: string;
  status: 'available' | 'on-call' | 'break' | 'offline';
  skills: string[];
}

export interface Campaign {
  id: string;
  name: string;
  type: 'predictive' | 'progressive' | 'voice-broadcast';
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  totalContacts: number;
  completedContacts: number;
}

export interface Call {
  id: string;
  type: 'inbound' | 'outbound';
  phoneNumber: string;
  duration: number;
  status: 'connected' | 'missed' | 'failed';
  agentId: string;
  timestamp: string;
  recordingUrl?: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'agent-performance' | 'campaign-results' | 'call-metrics';
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
}