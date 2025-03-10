import React from 'react';
import { Bell, ArrowLeft, Calendar, Check, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notification } from '../types/course';
import { WaveDivider } from '../components/WaveDivider';

// Extended mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Neue Kursanmeldungen',
    description: '5 neue Teilnehmer für "Einführung in KI"',
    type: 'success',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Kursupdate erforderlich',
    description: 'Modul 3 in "Web Development" benötigt Aktualisierung',
    type: 'warning',
    date: '2024-03-14'
  },
  {
    id: '3',
    title: 'KI-Empfehlung',
    description: 'Neue Kursempfehlungen basierend auf Ihrem Profil verfügbar',
    type: 'info',
    date: '2024-03-13'
  },
  {
    id: '4',
    title: 'Kurszertifikat verfügbar',
    description: 'Ihr Zertifikat für "Cloud Computing Basics" ist jetzt verfügbar',
    type: 'success',
    date: '2024-03-12'
  },
  {
    id: '5',
    title: 'Wartungsarbeiten geplant',
    description: 'Am 20.03.2024 von 02:00-04:00 Uhr finden Wartungsarbeiten statt',
    type: 'warning',
    date: '2024-03-11'
  },
  {
    id: '6',
    title: 'Neue Funktion verfügbar',
    description: 'KI-basierte Lernpfadempfehlungen sind jetzt verfügbar',
    type: 'info',
    date: '2024-03-10'
  }
];

function NotificationCard({ notification }: { notification: Notification }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'warning':
        return 'bg-yellow-50 border-yellow-100';
      case 'info':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${getTypeStyles(notification.type)} hover:shadow-md transition-shadow`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon(notification.type)}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(notification.date).toLocaleDateString()}
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
        </div>
      </div>
    </div>
  );
}

export function AllNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-4">
            <Link to="/dashboard" className="flex items-center text-blue-100 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zurück zum Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-10 h-10 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Benachrichtigungen</h1>
                <p className="text-blue-100 mt-1">
                  Alle Systemnachrichten und Updates
                </p>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider className="text-gray-50" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          {mockNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}