'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, Clock } from 'lucide-react';
import { mockPatients, mockAppointments } from '@/lib/data';

export default function ModeratorDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'moderator') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'moderator') {
    return null;
  }

  const upcomingAppointments = mockAppointments.filter(
    apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date()
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Patients"
                value={mockPatients.length}
                change={12.5}
                icon={<Users className="w-5 h-5" />}
                trend="up"
              />
              <StatsCard
                title="Today's Appointments"
                value={upcomingAppointments.length}
                change={8.2}
                icon={<Calendar className="w-5 h-5" />}
                trend="up"
              />
              <StatsCard
                title="Pending Records"
                value={5}
                change={-2.1}
                icon={<FileText className="w-5 h-5" />}
                trend="down"
              />
              <StatsCard
                title="Average Wait Time"
                value="12 min"
                change={-5.3}
                icon={<Clock className="w-5 h-5" />}
                trend="down"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.slice(0, 5).map((appointment) => {
                      const patient = mockPatients.find(p => p.id === appointment.patientId);
                      return (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {patient?.name.split(' ').map(n => n[0]).join('') || 'NA'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{patient?.name}</p>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                            <p className="text-xs text-gray-500">{appointment.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPatients.slice(0, 5).map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{patient.status}</p>
                          <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
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