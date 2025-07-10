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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Search, Edit, Clock, User } from 'lucide-react';

export default function ModeratorAppointments() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { appointments, patients, doctors, addAppointment, updateAppointment } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'moderator') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const filteredAppointments = appointments.filter(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    const matchesSearch = patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'check-up': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || user?.role !== 'moderator') {
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
              <p className="text-gray-600 mt-2">Manage patient appointments and scheduling</p>
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
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search appointments by patient, doctor, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    const doctor = doctors.find(d => d.id === appointment.doctorId);
                    
                    return (
                      <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{patient?.name}</h3>
                              <p className="text-sm text-gray-600">with {doctor?.name}</p>
                              <p className="text-xs text-gray-500">{doctor?.specialization}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusBadgeColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Badge className={getTypeBadgeColor(appointment.type)}>
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{appointment.time}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration: </span>
                            <span>{appointment.duration} min</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Type: </span>
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-3">
                            <span className="font-medium">Notes: </span>
                            {appointment.notes}
                          </p>
                        )}

                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingAppointment(appointment);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>No appointments found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}