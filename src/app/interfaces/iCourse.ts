
export interface Course {
  id: number;
  image?: string;
  type: 'Paid' | 'Free';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  assigned: boolean;
  isLive: boolean;
  enrollmentCount: number;
  rating: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  durationHours: number;
  progress?: number;
  amount?: number;
}

export interface CourseDetail {
  id: number;
  image?: string;
  introVideoUrl : string;
  type: 'Paid' | 'Free';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  assigned: boolean;
  isLive: boolean;
  enrollmentCount: number;
  rating: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  purchaseDate?: string;
  durationHours: number;
  progress?: number;
  amount?: number;
  learningOutcomes: learningOutcome[];
  sections: CourseSection[];
}

export interface LectureItem {
  title: string;
  type: 'video' | 'quiz' | 'document' | 'assignment' | 'other';
  duration?: string;
  videoUrl?: string;
  questionsCount?: number;
  documentUrl?: string;
  isCompleted?: boolean;
  isPreviewable?: boolean;
}

export interface CourseSection {
  id: string; 
  title: string;
  lectures: LectureItem[];
}

export interface learningOutcome {
  id: string; 
  outcomeText: string;
}


export interface ICourseResponse{
  success: boolean;
  statusCode: number;
  message: string;
  data: Course[];
  errormessage?: string;
  pageSize?:number;
  totalCount?:number;
  currentPage?:number;
}

export interface ICourseDetailResponse{
  success: boolean;
  statusCode: number;
  message: string;
  data: CourseDetail;
  errormessage?: string;
}