import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { WaveDivider } from '../components/WaveDivider';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Auto-fill login credentials
  useEffect(() => {
    setEmail('admin@bildungserlebnis.de');
    setPassword('admin123');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Top wave divider */}
      <WaveDivider className="text-blue-600/20" variant="gentle" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/5 rounded-3xl" />
            <img 
              src="/src/assets/images/img5.png" 
              alt="Login Illustration" 
              className="relative z-10 max-w-full h-auto object-contain"
            />
          </div>

          {/* Right side - Login form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            {/* Back to landing page */}
            <button
              onClick={() => navigate('/')}
              className="group flex items-center text-blue-600 hover:text-blue-700 mb-6 px-4 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Zurück zur Startseite
            </button>

            {/* App title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-8">
              Bildungserlebnis 4.0
            </h1>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder=" "
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  E-Mail
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder=" "
                />
                <label 
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Passwort
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Anmelden
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <WaveDivider className="text-blue-600/20" variant="gentle" flip={true} />
    </div>
  );
}