export type Gender = 'male' | 'female';

export interface EmployeeProfile {
  name: string;
  gender: Gender;
  role: string;
  connectedRole: string;
  department: string;
  mentorName: string;
  mentorTitle: string;
  mentorDescription: string;
  mentorPhoto?: string;
  managerName: string;
  managerTitle: string;
  startDate?: string;
  officeLocation?: string;
}

export interface Colleague {
  id: string;
  name: string;
  role: string;
  department: string;
  photoUrl?: string;
  subDepartment?: string;
  region?: string;
}

export interface ManagementLeader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  highlights: string[];
  department: string;
}

export interface SalesRegion {
  id: string;
  name: string;
  manager: string;
  color: string;
  cities: string[];
  branches: number;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChecklistItem {
  id: string;
  phase: 'Dan 1' | 'Sedmica 1' | 'Mjesec 1' | 'Mjesec 3';
  title: string;
  description: string;
  completed: boolean;
}

export interface StrategicGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
}
