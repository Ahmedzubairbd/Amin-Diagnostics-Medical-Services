'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp, Activity, Stethoscope } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { patients, doctors, appointments } = useDataStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const activePatients = patients.filter(p => p.status === 'active').length;
  const activeDoctors = doctors.filter(d => d.status === 'active').length;
  const scheduledAppointments = appointments.filter(a => a.status === 'scheduled').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Patients"
                value={patients.length.toLocaleString()}
                change={12.5}
                icon={<Users className="w-5 h-5" />}
                trend="up"
              />
              <StatsCard
                title="Active Doctors"
                value={activeDoctors.toLocaleString()}
                change={8.2}
                icon={<Stethoscope className="w-5 h-5" />}
                trend="up"
              />
              <StatsCard
                title="Scheduled Appointments"
                value={scheduledAppointments}
                change={15.3}
                icon={<Calendar className="w-5 h-5" />}
                trend="up"
              />
              <StatsCard
                title="Completed Appointments"
                value={completedAppointments}
                change={22.1}
                icon={<Activity className="w-5 h-5" />}
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>System Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Patient Management</p>
                          <p className="text-sm text-gray-600">{patients.length} total patients</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{activePatients}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Stethoscope className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Doctor Management</p>
                          <p className="text-sm text-gray-600">{doctors.length} total doctors</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{activeDoctors}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">Appointment System</p>
                          <p className="text-sm text-gray-600">{appointments.length} total appointments</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">{scheduledAppointments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'New patient registered', time: '2 hours ago', type: 'patient' },
                      { action: 'Appointment scheduled', time: '4 hours ago', type: 'appointment' },
                      { action: 'Doctor profile updated', time: '6 hours ago', type: 'doctor' },
                      { action: 'System backup completed', time: '1 day ago', type: 'system' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
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