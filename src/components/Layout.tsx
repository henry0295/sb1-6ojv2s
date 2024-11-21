import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  Headphones,
  LogOut,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Dialer', path: '/dialer', icon: Phone },
    { name: 'Campaigns', path: '/campaigns', icon: Users },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Agents', path: '/agents', icon: Headphones },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.path}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-indigo-50'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-indigo-600">Contact Center</h1>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="py-16 lg:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;