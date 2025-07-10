import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  availability: string[];
  patients: string[];
  experience: number;
  education: string;
  bio: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  type: 'diagnosis' | 'prescription' | 'lab-result' | 'imaging';
  title: string;
  description: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  id: string;
  patientId: string;
  doctorId: string;
  testName: string;
  testType: 'blood' | 'urine' | 'imaging' | 'biopsy' | 'cardiac' | 'other';
  date: string;
  results: string;
  normalRange?: string;
  status: 'pending' | 'completed' | 'reviewed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  status: 'active' | 'completed' | 'discontinued';
  startDate: string;
  endDate?: string;
  refillsRemaining: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: string;
}

export interface CMSContent {
  id: string;
  type: 'hero' | 'about' | 'services' | 'contact' | 'footer';
  title: string;
  content: string;
  image?: string;
  metadata?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OTPSession {
  id: string;
  userId: string;
  phone: string;
  otp: string;
  purpose: 'download' | 'login' | 'reset';
  expiresAt: string;
  verified: boolean;
  createdAt: string;
}

interface DataStore {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  testResults: TestResult[];
  prescriptions: Prescription[];
  messages: Message[];
  cmsContent: CMSContent[];
  otpSessions: OTPSession[];

  // Patient CRUD
  addPatient: (
    patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  getPatient: (id: string) => Patient | undefined;

  // Doctor CRUD
  addDoctor: (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  getDoctor: (id: string) => Doctor | undefined;

  // Appointment CRUD
  addAppointment: (
    appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;

  // Medical Record CRUD
  addMedicalRecord: (
    record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateMedicalRecord: (id: string, record: Partial<MedicalRecord>) => void;
  deleteMedicalRecord: (id: string) => void;
  getMedicalRecord: (id: string) => MedicalRecord | undefined;

  // Test Result CRUD
  addTestResult: (
    result: Omit<TestResult, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateTestResult: (id: string, result: Partial<TestResult>) => void;
  deleteTestResult: (id: string) => void;
  getTestResult: (id: string) => TestResult | undefined;

  // Prescription CRUD
  addPrescription: (
    prescription: Omit<Prescription, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updatePrescription: (id: string, prescription: Partial<Prescription>) => void;
  deletePrescription: (id: string) => void;
  getPrescription: (id: string) => Prescription | undefined;

  // Message CRUD
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  getMessage: (id: string) => Message | undefined;

  // CMS Content CRUD
  addCMSContent: (
    content: Omit<CMSContent, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateCMSContent: (id: string, content: Partial<CMSContent>) => void;
  deleteCMSContent: (id: string) => void;
  getCMSContent: (type: string) => CMSContent[];

  // OTP Management
  generateOTP: (
    userId: string,
    phone: string,
    purpose: 'download' | 'login' | 'reset'
  ) => string;
  verifyOTP: (userId: string, otp: string, purpose: string) => boolean;
  clearExpiredOTPs: () => void;
}

// Initial data
const initialPatients: Patient[] = [
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
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
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
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
];

const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    email: 'sarah.chen@hospital.com',
    phone: '+1-555-0200',
    availability: ['Mon', 'Wed', 'Fri'],
    patients: ['1'],
    experience: 15,
    education: 'MD from Harvard Medical School',
    bio: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Internal Medicine',
    email: 'michael.rodriguez@hospital.com',
    phone: '+1-555-0201',
    availability: ['Tue', 'Thu', 'Sat'],
    patients: ['2'],
    experience: 12,
    education: 'MD from Johns Hopkins University',
    bio: 'Internal medicine specialist with focus on preventive care and chronic disease management.',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const initialTestResults: TestResult[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    testName: 'Complete Blood Count',
    testType: 'blood',
    date: '2024-01-15',
    results: 'WBC: 7.2, RBC: 4.5, Hemoglobin: 14.2',
    normalRange: 'WBC: 4.5-11.0, RBC: 4.2-5.4, Hemoglobin: 12.0-15.5',
    status: 'completed',
    priority: 'normal',
    notes: 'All values within normal range',
    downloadUrl: '/downloads/cbc-john-doe-20240115.pdf',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    testName: 'Chest X-Ray',
    testType: 'imaging',
    date: '2024-01-12',
    results: 'Clear lung fields, no acute findings',
    status: 'reviewed',
    priority: 'normal',
    notes: 'Follow-up in 6 months',
    downloadUrl: '/downloads/xray-sarah-johnson-20240112.pdf',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
];

const initialPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '90 days',
    instructions: 'Take with meals',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    refillsRemaining: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-20',
    time: '10:00',
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Blood pressure check',
    duration: 30,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
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
    duration: 45,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

const initialCMSContent: CMSContent[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Amin CMS Dashboard',
    content: 'Comprehensive healthcare management for better patient care',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    type: 'about',
    title: 'About Our Healthcare System',
    content:
      'We provide world-class healthcare management solutions with cutting-edge technology and compassionate care.',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      patients: initialPatients,
      doctors: initialDoctors,
      appointments: initialAppointments,
      medicalRecords: [],
      testResults: initialTestResults,
      prescriptions: initialPrescriptions,
      messages: [],
      cmsContent: initialCMSContent,
      otpSessions: [],

      // Patient CRUD
      addPatient: (patient) => {
        const newPatient: Patient = {
          ...patient,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ patients: [...state.patients, newPatient] }));
      },

      updatePatient: (id, updates) => {
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === id
              ? { ...patient, ...updates, updatedAt: new Date().toISOString() }
              : patient
          ),
        }));
      },

      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        }));
      },

      getPatient: (id) => {
        return get().patients.find((patient) => patient.id === id);
      },

      // Doctor CRUD
      addDoctor: (doctor) => {
        const newDoctor: Doctor = {
          ...doctor,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ doctors: [...state.doctors, newDoctor] }));
      },

      updateDoctor: (id, updates) => {
        set((state) => ({
          doctors: state.doctors.map((doctor) =>
            doctor.id === id
              ? { ...doctor, ...updates, updatedAt: new Date().toISOString() }
              : doctor
          ),
        }));
      },

      deleteDoctor: (id) => {
        set((state) => ({
          doctors: state.doctors.filter((doctor) => doctor.id !== id),
        }));
      },

      getDoctor: (id) => {
        return get().doctors.find((doctor) => doctor.id === id);
      },

      // Appointment CRUD
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }));
      },

      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id
              ? {
                  ...appointment,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : appointment
          ),
        }));
      },

      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== id
          ),
        }));
      },

      getAppointment: (id) => {
        return get().appointments.find((appointment) => appointment.id === id);
      },

      // Medical Record CRUD
      addMedicalRecord: (record) => {
        const newRecord: MedicalRecord = {
          ...record,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          medicalRecords: [...state.medicalRecords, newRecord],
        }));
      },

      updateMedicalRecord: (id, updates) => {
        set((state) => ({
          medicalRecords: state.medicalRecords.map((record) =>
            record.id === id
              ? { ...record, ...updates, updatedAt: new Date().toISOString() }
              : record
          ),
        }));
      },

      deleteMedicalRecord: (id) => {
        set((state) => ({
          medicalRecords: state.medicalRecords.filter(
            (record) => record.id !== id
          ),
        }));
      },

      getMedicalRecord: (id) => {
        return get().medicalRecords.find((record) => record.id === id);
      },

      // Test Result CRUD
      addTestResult: (result) => {
        const newResult: TestResult = {
          ...result,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ testResults: [...state.testResults, newResult] }));
      },

      updateTestResult: (id, updates) => {
        set((state) => ({
          testResults: state.testResults.map((result) =>
            result.id === id
              ? { ...result, ...updates, updatedAt: new Date().toISOString() }
              : result
          ),
        }));
      },

      deleteTestResult: (id) => {
        set((state) => ({
          testResults: state.testResults.filter((result) => result.id !== id),
        }));
      },

      getTestResult: (id) => {
        return get().testResults.find((result) => result.id === id);
      },

      // Prescription CRUD
      addPrescription: (prescription) => {
        const newPrescription: Prescription = {
          ...prescription,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          prescriptions: [...state.prescriptions, newPrescription],
        }));
      },

      updatePrescription: (id, updates) => {
        set((state) => ({
          prescriptions: state.prescriptions.map((prescription) =>
            prescription.id === id
              ? {
                  ...prescription,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : prescription
          ),
        }));
      },

      deletePrescription: (id) => {
        set((state) => ({
          prescriptions: state.prescriptions.filter(
            (prescription) => prescription.id !== id
          ),
        }));
      },

      getPrescription: (id) => {
        return get().prescriptions.find(
          (prescription) => prescription.id === id
        );
      },

      // Message CRUD
      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ messages: [...state.messages, newMessage] }));
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === id ? { ...message, ...updates } : message
          ),
        }));
      },

      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        }));
      },

      getMessage: (id) => {
        return get().messages.find((message) => message.id === id);
      },

      // CMS Content CRUD
      addCMSContent: (content) => {
        const newContent: CMSContent = {
          ...content,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ cmsContent: [...state.cmsContent, newContent] }));
      },

      updateCMSContent: (id, updates) => {
        set((state) => ({
          cmsContent: state.cmsContent.map((content) =>
            content.id === id
              ? { ...content, ...updates, updatedAt: new Date().toISOString() }
              : content
          ),
        }));
      },

      deleteCMSContent: (id) => {
        set((state) => ({
          cmsContent: state.cmsContent.filter((content) => content.id !== id),
        }));
      },

      getCMSContent: (type) => {
        return get().cmsContent.filter((content) => content.type === type);
      },

      // OTP Management
      generateOTP: (userId, phone, purpose) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

        const newOTPSession: OTPSession = {
          id: Date.now().toString(),
          userId,
          phone,
          otp,
          purpose,
          expiresAt,
          verified: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          otpSessions: [
            ...state.otpSessions.filter(
              (s) => s.userId !== userId || s.purpose !== purpose
            ),
            newOTPSession,
          ],
        }));

        // Simulate SMS sending (in real app, integrate with SMS service)
        console.log(`SMS OTP sent to ${phone}: ${otp}`);

        return otp;
      },

      verifyOTP: (userId, otp, purpose) => {
        const session = get().otpSessions.find(
          (s) =>
            s.userId === userId &&
            s.otp === otp &&
            s.purpose === purpose &&
            !s.verified
        );

        if (session && new Date(session.expiresAt) > new Date()) {
          set((state) => ({
            otpSessions: state.otpSessions.map((s) =>
              s.id === session.id ? { ...s, verified: true } : s
            ),
          }));
          return true;
        }
        return false;
      },

      clearExpiredOTPs: () => {
        const now = new Date();
        set((state) => ({
          otpSessions: state.otpSessions.filter(
            (s) => new Date(s.expiresAt) > now
          ),
        }));
      },
    }),
    {
      name: 'healthcare-data-store',
    }
  )
);
