import React from 'react';
import { Phone, PhoneOff, UserCheck, Clock, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

const AgentDashboard = () => {
  const [status, setStatus] = React.useState<'available' | 'on-call' | 'break'>('available');
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Status</p>
              <p className="text-xl font-semibold mt-1">
                {status === 'available' && 'Available'}
                {status === 'on-call' && 'On Call'}
                {status === 'break' && 'On Break'}
              </p>
            </div>
            <div className={`rounded-full p-3 ${
              status === 'available' ? 'bg-green-100' :
              status === 'on-call' ? 'bg-blue-100' : 'bg-yellow-100'
            }`}>
              {status === 'available' && <UserCheck className="w-6 h-6 text-green-600" />}
              {status === 'on-call' && <Phone className="w-6 h-6 text-blue-600" />}
              {status === 'break' && <Clock className="w-6 h-6 text-yellow-600" />}
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setStatus('available')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                status === 'available'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setStatus('break')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                status === 'break'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Break
            </button>
          </div>
        </div>

        {/* Call Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm text-gray-600">Today's Calls</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PhoneIncoming className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">Inbound</span>
              </div>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PhoneOutgoing className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm">Outbound</span>
              </div>
              <span className="font-semibold">36</span>
            </div>
          </div>
        </div>

        {/* Current Queue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm text-gray-600">Queue Status</h3>
          <div className="mt-4">
            <div className="text-2xl font-bold text-indigo-600">12</div>
            <p className="text-sm text-gray-600">Calls in Queue</p>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Average Handling Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm text-gray-600">Avg. Handling Time</h3>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">3:45</div>
            <p className="text-sm text-gray-600">Minutes per call</p>
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Call Controls</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Extension:</span>
            <span className="font-mono bg-gray-100 px-3 py-1 rounded">1001</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Phone className="w-5 h-5 mr-2" />
            Accept Call
          </button>
          <button className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <PhoneOff className="w-5 h-5 mr-2" />
            End Call
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Hold
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;