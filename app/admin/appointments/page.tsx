'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import AppointmentForm from '@/components/Forms/AppointmentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminAppointments() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { appointments, patients, doctors, addAppointment, updateAppointment, deleteAppointment } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const filteredAppointments = appointments.filter(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return (
      patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddAppointment = (appointmentData) => {
    addAppointment(appointmentData);
    setShowForm(false);
  };

  const handleEditAppointment = (appointmentData) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, appointmentData);
      setEditingAppointment(null);
      setShowForm(false);
    }
  };

  const handleDeleteAppointment = (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'check-up':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  if (showForm) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <AppointmentForm
              appointment={editingAppointment}
              onSubmit={editingAppointment ? handleEditAppointment : handleAddAppointment}
              onCancel={() => {
                setShowForm(false);
                setEditingAppointment(null);
              }}
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
              <p className="text-gray-600 mt-2">Manage all appointments and scheduling</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>All Appointments ({appointments.length})</span>
                  </CardTitle>
                  <Button 
                    className="flex items-center space-x-2"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Appointment</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search appointments by patient, doctor, type, or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Patient</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Doctor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => {
                        const patient = patients.find(p => p.id === appointment.patientId);
                        const doctor = doctors.find(d => d.id === appointment.doctorId);
                        
                        return (
                          <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-white">
                                    {patient?.name.split(' ').map(n => n[0]).join('') || 'NA'}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900">{patient?.name || 'Unknown'}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{doctor?.name || 'Unknown'}</p>
                                <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{appointment.date}</p>
                                <p className="text-sm text-gray-600">{appointment.time}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getTypeBadgeColor(appointment.type)}>
                                {appointment.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadgeColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {appointment.duration} min
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setEditingAppointment(appointment);
                                    setShowForm(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => handleDeleteAppointment(appointment.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No appointments found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}