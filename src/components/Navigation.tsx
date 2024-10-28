import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, HelpCircle, Users } from 'lucide-react';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/polls', icon: HelpCircle, label: 'Polls' },
    { path: '/participants', icon: Users, label: 'Participants' },
  ];

  return (
    <nav className="bg-white border-t">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center p-3 flex-1 ${
              location.pathname === path
                ? 'text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;