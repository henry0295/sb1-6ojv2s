import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Phone, Users, Clock, PhoneCall } from 'lucide-react';

const data = [
  { name: 'Mon', calls: 120, answered: 100, abandoned: 20 },
  { name: 'Tue', calls: 150, answered: 130, abandoned: 20 },
  { name: 'Wed', calls: 180, answered: 150, abandoned: 30 },
  { name: 'Thu', calls: 140, answered: 120, abandoned: 20 },
  { name: 'Fri', calls: 160, answered: 140, abandoned: 20 },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Calls */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold mt-1">1,234</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-green-500 text-sm">↑ 12%</span>
              <span className="text-gray-500 text-sm ml-2">vs last week</span>
            </div>
          </div>
        </div>

        {/* Active Agents */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold mt-1">45</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Average Handle Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Handle Time</p>
              <p className="text-2xl font-bold mt-1">4:32</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-red-500 text-sm">↑ 3%</span>
              <span className="text-gray-500 text-sm ml-2">vs target</span>
            </div>
          </div>
        </div>

        {/* Service Level */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Service Level</p>
              <p className="text-2xl font-bold mt-1">92%</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <PhoneCall className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Call Volume Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="answered" stackId="a" fill="#4F46E5" />
                <Bar dataKey="abandoned" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
          <div className="space-y-4">
            {[
              { name: 'Customer Survey', type: 'Predictive', progress: 75 },
              { name: 'Sales Outreach', type: 'Progressive', progress: 45 },
              { name: 'Service Follow-up', type: 'Voice Broadcast', progress: 90 },
            ].map((campaign) => (
              <div key={campaign.name} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.type}</p>
                  </div>
                  <span className="text-sm font-medium">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;