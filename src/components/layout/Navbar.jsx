import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const userRole = user?.role || 'student';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, message: 'New order received', time: '5 min ago', unread: true },
    { id: 2, message: 'Book stock running low', time: '1 hour ago', unread: true },
    { id: 3, message: 'Payment received', time: '2 hours ago', unread: false }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  const handleChat = () => {
    alert('Opening chat...');
  };

  const navItems = user ? (
    userRole === 'student' 
      ? [
          { name: 'Dashboard', href: '/student/dashboard' },
          { name: 'Browse', href: '/browse' },
          { name: 'Sell', href: '/sell' },
          { name: 'Notes', href: '/notes' },
          { name: 'Blog', href: '/blog' }
        ]
      : [
          { name: 'Dashboard', href: '/library/dashboard' }
        ]
  ) : [
      { name: 'Browse', href: '/browse' },
      { name: 'Blog', href: '/blog' }
    ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-soft border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">SmartBook</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, notes, or authors..."
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-secondary-50/50 transition-all duration-200"
                />
              </form>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="relative">
                  <button onClick={handleNotifications} className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 hover:bg-primary-50 rounded-lg relative">
                    <BellIcon className="h-6 w-6" />
                    {notifications.filter(n => n.unread).length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`p-4 border-b hover:bg-gray-50 ${notif.unread ? 'bg-blue-50' : ''}`}>
                            <p className="text-sm text-gray-800">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button onClick={() => setShowNotifications(false)} className="text-sm text-primary-600 hover:text-primary-700">Close</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 hover:bg-primary-50 rounded-lg">
                    <UserCircleIcon className="h-6 w-6" />
                  </Link>
                  <span className="text-sm text-secondary-600">Hi, {user.name}</span>
                  <Button onClick={logout} variant="ghost" size="sm">Logout</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-secondary-200 py-4 bg-white/95 backdrop-blur-sm"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-primary-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};