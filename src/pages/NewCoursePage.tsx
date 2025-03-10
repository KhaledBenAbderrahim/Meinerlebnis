import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Users, Clock, Target, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course, CourseCategory, CourseStatus } from '../types/course';
import { WaveDivider } from '../components/WaveDivider';

const courseCategories: { value: CourseCategory; label: string }[] = [
  { value: 'programming', label: 'Programmierung' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'ai', label: 'Künstliche Intelligenz' },
  { value: 'cloud', label: 'Cloud Computing' },
  { value: 'business', label: 'Business' },
  { value: 'design', label: 'Design' }
];

export function NewCoursePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming' as CourseCategory,
    startDate: '',
    endDate: '',
    moduleCount: 1,
    maxStudents: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would be an API call
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'draft' as CourseStatus,
      studentCount: 0,
      lastModified: new Date().toISOString()
    };

    // Navigate back to dashboard after creation
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <div className="flex items-center">
            <BookOpen className="w-10 h-10 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Neuen Kurs erstellen</h1>
              <p className="text-blue-100 mt-1">
                Erstellen Sie einen neuen Kurs für Ihre Lernplattform
              </p>
            </div>
          </div>
        </div>
        <WaveDivider className="text-gray-50" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Grundinformationen</h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Kurstitel
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="z.B. Einführung in Machine Learning"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Beschreibung
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Beschreiben Sie den Kursinhalt..."
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {courseCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Zeitplan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Startdatum
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Enddatum
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Structure */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Kursstruktur</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="moduleCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Anzahl Module
                  </label>
                  <input
                    type="number"
                    id="moduleCount"
                    name="moduleCount"
                    value={formData.moduleCount}
                    onChange={handleChange}
                    min="1"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximale Teilnehmerzahl
                  </label>
                  <input
                    type="number"
                    id="maxStudents"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleChange}
                    min="1"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kurs erstellen
              </button>
            </div>
          </form>

          {/* Preview Card */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kursvorschau</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">{formData.title || 'Kurstitel'}</h3>
              <p className="text-gray-600 mt-2">{formData.description || 'Kursbeschreibung'}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formData.startDate || 'Startdatum'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{formData.endDate || 'Enddatum'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{formData.moduleCount} Module</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Max. {formData.maxStudents} Teilnehmer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}