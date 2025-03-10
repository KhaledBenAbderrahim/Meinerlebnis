export type CourseStatus = 'draft' | 'active' | 'archived';
export type CourseCategory = 'programming' | 'data-science' | 'ai' | 'cloud' | 'business' | 'design';

export interface Course {
  id: string;
  title: string;
  status: CourseStatus;
  category: CourseCategory;
  startDate: string;
  endDate: string;
  description: string;
  moduleCount: number;
  studentCount: number;
  lastModified: string;
  progress?: number;
  nextLesson?: string;
  instructor?: string;
  aiRecommendationScore?: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  date: string;
}

export interface LearningMetric {
  id: string;
  label: string;
  value: number;
  trend: number;
  icon: string;
}