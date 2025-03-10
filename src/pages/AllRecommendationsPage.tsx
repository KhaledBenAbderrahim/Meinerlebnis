import React from 'react';
import { Brain, ArrowLeft, Rocket, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types/course';
import { WaveDivider } from '../components/WaveDivider';

// Extended mock data for recommendations
const mockRecommendations: Course[] = [
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
    lastModified: '2024-03-15',
    instructor: 'Dr. Maria Schmidt',
    aiRecommendationScore: 98,
    progress: 0
  },
  {
    id: '2',
    title: 'Machine Learning Advanced',
    status: 'draft',
    category: 'ai',
    startDate: '2024-04-01',
    endDate: '2024-05-30',
    description: 'Fortgeschrittene Konzepte des maschinellen Lernens',
    moduleCount: 10,
    studentCount: 0,
    lastModified: '2024-03-16',
    instructor: 'Prof. Dr. Thomas Weber',
    aiRecommendationScore: 95,
    progress: 0
  },
  {
    id: '3',
    title: 'Deep Learning Fundamentals',
    status: 'active',
    category: 'ai',
    startDate: '2024-03-15',
    endDate: '2024-05-15',
    description: 'Grundlagen des Deep Learning und neuronaler Netze',
    moduleCount: 12,
    studentCount: 32,
    lastModified: '2024-03-14',
    instructor: 'Dr. Sarah Meyer',
    aiRecommendationScore: 93,
    progress: 0
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    status: 'draft',
    category: 'ai',
    startDate: '2024-05-01',
    endDate: '2024-06-30',
    description: 'Verarbeitung natürlicher Sprache mit KI',
    moduleCount: 8,
    studentCount: 0,
    lastModified: '2024-03-13',
    instructor: 'Dr. Michael Klein',
    aiRecommendationScore: 91,
    progress: 0
  }
];

function RecommendationCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
        </div>
        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <Brain className="w-4 h-4 mr-1" />
          {course.aiRecommendationScore}% Match
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>Dozent: {course.instructor}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Target className="w-4 h-4 mr-2" />
          <span>{course.moduleCount} Module</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Rocket className="w-4 h-4 mr-2" />
          <span>Start: {new Date(course.startDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Zum Kurs
        </button>
      </div>
    </div>
  );
}

export function AllRecommendationsPage() {
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
              <Brain className="w-10 h-10 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">KI-Empfehlungen</h1>
                <p className="text-blue-100 mt-1">
                  Personalisierte Kursempfehlungen basierend auf Ihrem Lernprofil
                </p>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider className="text-gray-50" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecommendations.map(course => (
            <RecommendationCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}