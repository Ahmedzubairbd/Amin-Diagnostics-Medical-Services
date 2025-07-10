'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Pill, TestTube, Clock, MapPin, Phone } from 'lucide-react';
import { mockAppointments, mockDoctors, mockMedicalRecords } from '@/lib/data';

export default function PatientDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'patient') {
    return null;
  }

  const upcomingAppointments = mockAppointments.filter(
    apt => apt.patientId === user.id && apt.status === 'scheduled'
  );

  const recentRecords = mockMedicalRecords.filter(
    record => record.patientId === user.id
  ).slice(0, 3);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Appointments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => {
                        const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                        return (
                          <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{doctor?.name}</p>
                                <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                                <p className="text-sm text-blue-600 font-medium">{appointment.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{appointment.date}</p>
                              <p className="text-sm text-gray-600">{appointment.time}</p>
                              <p className="text-xs text-gray-500">{appointment.duration} minutes</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>No upcoming appointments</p>
                      <Button className="mt-4">Schedule Appointment</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Pill className="w-4 h-4 mr-2" />
                    Request Prescription
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TestTube className="w-4 h-4 mr-2" />
                    View Test Results
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Doctor
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TestTube className="w-5 h-5" />
                    <span>Recent Medical Records</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRecords.map((record) => {
                      const doctor = mockDoctors.find(d => d.id === record.doctorId);
                      return (
                        <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{record.title}</h4>
                            <span className="text-xs text-gray-500">{record.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                          <p className="text-xs text-gray-500">By {doctor?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5" />
                    <span>Current Medications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Metformin 500mg', 'Lisinopril 10mg', 'Vitamin D3'].map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <Pill className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{medication}</p>
                            <p className="text-sm text-gray-600">Take with food</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Active</p>
                          <p className="text-xs text-gray-500">Daily</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}