// Mock data for the healthcare system
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'check-up';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  duration: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  availability: string[];
  patients: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'diagnosis' | 'prescription' | 'lab-result' | 'imaging';
  title: string;
  description: string;
  attachments?: string[];
  doctorId: string;
}

// Mock data
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1-555-0124',
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    currentMedications: ['Metformin', 'Lisinopril'],
    allergies: ['Penicillin'],
    lastVisit: '2024-01-10',
    nextAppointment: '2024-01-20',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1990-07-22',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Mike Johnson - +1-555-0126',
    medicalHistory: ['Asthma'],
    currentMedications: ['Albuterol'],
    allergies: ['Shellfish'],
    lastVisit: '2024-01-12',
    status: 'active'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    email: 'sarah.chen@hospital.com',
    phone: '+1-555-0200',
    availability: ['Mon', 'Wed', 'Fri'],
    patients: ['1']
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Internal Medicine',
    email: 'michael.rodriguez@hospital.com',
    phone: '+1-555-0201',
    availability: ['Tue', 'Thu', 'Sat'],
    patients: ['2']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-20',
    time: '10:00',
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Blood pressure check',
    duration: 30
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2024-01-22',
    time: '14:30',
    type: 'consultation',
    status: 'scheduled',
    notes: 'Asthma evaluation',
    duration: 45
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-01-10',
    type: 'diagnosis',
    title: 'Hypertension Management',
    description: 'Patient shows good control of blood pressure with current medication regimen.',
    doctorId: '1'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-01-12',
    type: 'prescription',
    title: 'Asthma Medication Refill',
    description: 'Renewed prescription for Albuterol inhaler.',
    doctorId: '2'
  }
];

export const mockAnalytics = {
  totalPatients: 1247,
  activePatients: 1189,
  totalAppointments: 234,
  upcomingAppointments: 45,
  completedAppointments: 189,
  totalRevenue: 125000,
  monthlyGrowth: 12.5,
  patientSatisfaction: 4.7
};