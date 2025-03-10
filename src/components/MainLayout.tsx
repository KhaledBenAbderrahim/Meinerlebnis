import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Palette, 
  BarChart3, 
  Search, 
  Menu, 
  X,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { WaveDivider } from './WaveDivider';

const navItems = [
  { path: '/dashboard', label: 'Kursverwaltung', icon: LayoutDashboard },
  { path: '/courses', label: 'Kurse', icon: BookOpen },
  { path: '/modules', label: 'Module', icon: Layers },
  { path: '/formats', label: 'Lernformate', icon: Palette },
  { path: '/analytics', label: 'Analysen', icon: BarChart3 },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const currentPage = navItems.find(item => item.path === location.pathname)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Side Navigation */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 transform ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        } transition-all duration-300 ease-in-out z-30`}
      >
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-xl">
          <div className="flex items-center justify-between h-16 px-4 bg-blue-700">
            <h2 className={`text-xl font-bold transition-opacity duration-300 ${!isNavOpen && 'lg:opacity-0'}`}>
              Bildungserlebnis
            </h2>
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 min-w-[1.25rem]" />
                  <span className={`ml-3 font-medium transition-opacity duration-300 ${
                    !isNavOpen && 'lg:opacity-0 lg:hidden'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-blue-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 min-w-[1.25rem]" />
              <span className={`ml-3 transition-opacity duration-300 ${
                !isNavOpen && 'lg:opacity-0 lg:hidden'
              }`}>
                Abmelden
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Toggle button for large screens */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="hidden lg:flex fixed left-64 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-12 bg-blue-700 hover:bg-blue-600 transition-all duration-300 ease-in-out z-40 rounded-r-md transform shadow-md"
        style={{
          left: isNavOpen ? '256px' : '80px',
        }}
      >
        {isNavOpen ? (
          <ChevronLeft className="h-4 w-4 text-white" />
        ) : (
          <ChevronRight className="h-4 w-4 text-white" />
        )}
      </button>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isNavOpen ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 text-2xl font-bold">{currentPage}</h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Suche..."
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-blue-900 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                  >
                    <span className="font-medium text-white">A</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Einstellungen
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Abmelden
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <WaveDivider className="text-gray-50" />
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile navigation */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </div>
  );
}