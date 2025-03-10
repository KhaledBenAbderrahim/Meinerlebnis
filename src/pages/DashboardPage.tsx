import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  FileText, 
  MoreVertical,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  Filter,
  ArrowUpDown,
  Users,
  Trash2,
  Archive,
  Copy,
  Eye,
  Share2
} from 'lucide-react';
import { Course, CourseStatus, Notification } from '../types/course';
import { WaveDivider } from '../components/WaveDivider';

// Mock data remains unchanged...
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Einführung in Künstliche Intelligenz',
    status: 'active',
    category: 'ai',
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    description: 'Grundlagen der KI und maschinelles Lernen',
    moduleCount: 8,
    studentCount: 45,
    lastModified: '2024-03-15'
  },
  {
    id: '2',
    title: 'Data Science Basics',
    status: 'draft',
    category: 'data-science',
    startDate: '2024-04-15',
    endDate: '2024-06-15',
    description: 'Einführung in die Datenanalyse',
    moduleCount: 6,
    studentCount: 0,
    lastModified: '2024-03-14'
  },
  {
    id: '3',
    title: 'Web Development Advanced',
    status: 'active',
    category: 'programming',
    startDate: '2024-03-10',
    endDate: '2024-05-10',
    description: 'Fortgeschrittene Webtechnologien',
    moduleCount: 12,
    studentCount: 32,
    lastModified: '2024-03-13'
  },
  {
    id: '4',
    title: 'Cloud Computing',
    status: 'archived',
    category: 'cloud',
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    description: 'Cloud-Infrastruktur und Services',
    moduleCount: 10,
    studentCount: 28,
    lastModified: '2024-02-01'
  }
];

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
  }
];

const statusColors: Record<CourseStatus, { bg: string; text: string; border: string }> = {
  draft: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  archived: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
};

function StatusBadge({ status }: { status: CourseStatus }) {
  const colors = statusColors[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
      {status === 'draft' && 'Entwurf'}
      {status === 'active' && 'Aktiv'}
      {status === 'archived' && 'Archiviert'}
    </span>
  );
}

function QuickStatsCard({ icon: Icon, title, value, trend }: { icon: any; title: string; value: string; trend?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && <p className="text-sm text-green-600 mt-1">{trend}</p>}
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  const typeColors = {
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`p-4 rounded-lg border ${typeColors[notification.type]} mb-3`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{notification.title}</h4>
          <p className="text-sm mt-1">{notification.description}</p>
        </div>
        <span className="text-xs opacity-75">{new Date(notification.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

interface ActionMenuProps {
  course: Course;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

function ActionMenu({ course, onClose, menuRef }: ActionMenuProps) {
  const handleAction = (action: string) => {
    switch (action) {
      case 'edit':
        alert(`Kurs "${course.title}" wird bearbeitet`);
        break;
      case 'preview':
        alert(`Vorschau für "${course.title}" wird geöffnet`);
        break;
      case 'duplicate':
        alert(`Kurs "${course.title}" wird dupliziert`);
        break;
      case 'share':
        alert(`Freigabeoptionen für "${course.title}" werden geöffnet`);
        break;
      case 'archive':
        alert(`Kurs "${course.title}" wird archiviert`);
        break;
      case 'delete':
        if (confirm(`Möchten Sie den Kurs "${course.title}" wirklich löschen?`)) {
          alert('Kurs wurde gelöscht');
        }
        break;
    }
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="py-1" role="menu">
        <button
          onClick={() => handleAction('edit')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Edit2 className="w-4 h-4 mr-3" />
          Bearbeiten
        </button>
        <button
          onClick={() => handleAction('preview')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="w-4 h-4 mr-3" />
          Vorschau
        </button>
        <button
          onClick={() => handleAction('duplicate')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Copy className="w-4 h-4 mr-3" />
          Duplizieren
        </button>
        <button
          onClick={() => handleAction('share')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Share2 className="w-4 h-4 mr-3" />
          Freigeben
        </button>
        <hr className="my-1" />
        <button
          onClick={() => handleAction('archive')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Archive className="w-4 h-4 mr-3" />
          Archivieren
        </button>
        <button
          onClick={() => handleAction('delete')}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-3" />
          Löschen
        </button>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'all'>('all');
  const [sortField, setSortField] = useState<'title' | 'status' | 'startDate'>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCourses = mockCourses
    .filter(course => 
      (statusFilter === 'all' || course.status === statusFilter) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'title') {
        return direction * a.title.localeCompare(b.title);
      } else if (sortField === 'status') {
        return direction * a.status.localeCompare(b.status);
      } else {
        return direction * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      }
    });

  const activeCourses = mockCourses.filter(c => c.status === 'active').length;
  const totalStudents = mockCourses.reduce((sum, course) => sum + course.studentCount, 0);

  const handleQuickAction = (action: string, course: Course) => {
    switch (action) {
      case 'edit':
        alert(`Schnellbearbeitung für "${course.title}" gestartet`);
        break;
      case 'view':
        alert(`Detailansicht für "${course.title}" wird geöffnet`);
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatsCard 
          icon={BookOpen}
          title="Aktive Kurse"
          value={`${activeCourses}`}
          trend="+2 diese Woche"
        />
        <QuickStatsCard 
          icon={Calendar}
          title="Geplante Kurse"
          value={`${mockCourses.filter(c => c.status === 'draft').length}`}
        />
        <QuickStatsCard 
          icon={Bell}
          title="Offene Updates"
          value={`${mockNotifications.length}`}
        />
        <QuickStatsCard 
          icon={Users}
          title="Aktive Teilnehmer"
          value={`${totalStudents}`}
          trend="+15% zum Vormonat"
        />
      </div>

      {/* Course Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Kurse verwalten</h2>
            <Link
              to="/courses/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Neuer Kurs
            </Link>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Kurse durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as CourseStatus | 'all')}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="all">Alle Status</option>
                  <option value="active">Aktiv</option>
                  <option value="draft">Entwurf</option>
                  <option value="archived">Archiviert</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Course Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => {
                      if (sortField === 'title') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('title');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    <span>Titel</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => {
                      if (sortField === 'status') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('status');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => {
                      if (sortField === 'startDate') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('startDate');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    <span>Zeitraum</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teilnehmer
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Aktionen</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.moduleCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.studentCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3 relative">
                      <button 
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        onClick={() => handleQuickAction('edit', course)}
                        title="Bearbeiten"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        onClick={() => handleQuickAction('view', course)}
                        title="Details anzeigen"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button 
                        ref={buttonRef}
                        className="text-gray-400 hover:text-gray-600 transition-colors relative"
                        onClick={() => setActiveMenu(activeMenu === course.id ? null : course.id)}
                        title="Weitere Aktionen"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {activeMenu === course.id && (
                        <ActionMenu 
                          course={course} 
                          onClose={() => setActiveMenu(null)}
                          menuRef={menuRef}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">KI-Empfehlungen</h2>
          <Link 
            to="/recommendations" 
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Alle anzeigen
          </Link>
        </div>
        <p className="text-blue-100">Personalisierte Kursvorschläge basierend auf Ihrem Profil</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Benachrichtigungen</h2>
            <Link 
              to="/notifications"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Alle anzeigen
            </Link>
          </div>
          <div className="space-y-3">
            {mockNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}