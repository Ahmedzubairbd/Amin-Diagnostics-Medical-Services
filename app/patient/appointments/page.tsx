'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Clock, User, Edit, X } from 'lucide-react';

export default function PatientAppointments() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { appointments, doctors, addAppointment, updateAppointment } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'consultation' as 'consultation' | 'follow-up' | 'emergency' | 'check-up',
    notes: ''
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const patientAppointments = appointments.filter(apt => apt.patientId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, {
        ...formData,
        status: 'scheduled',
        duration: 30
      });
    } else {
      addAppointment({
        patientId: user!.id,
        ...formData,
        status: 'scheduled',
        duration: 30
      });
    }
    setShowForm(false);
    setEditingAppointment(null);
    setFormData({
      doctorId: '',
      date: '',
      time: '',
      type: 'consultation',
      notes: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || user?.role !== 'patient') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-2">Manage your healthcare appointments</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Upcoming Appointments</span>
                      </CardTitle>
                      <Button onClick={() => setShowForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientAppointments.map((appointment) => {
                        const doctor = doctors.find(d => d.id === appointment.doctorId);
                        return (
                          <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{doctor?.name}</h3>
                                  <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-2">
                              Type: {appointment.type} • Duration: {appointment.duration} min
                            </p>
                            
                            {appointment.notes && (
                              <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                                {appointment.notes}
                              </p>
                            )}

                            {appointment.status === 'scheduled' && (
                              <div className="flex justify-end mt-3">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setEditingAppointment(appointment);
                                    setFormData({
                                      doctorId: appointment.doctorId,
                                      date: appointment.date,
                                      time: appointment.time,
                                      type: appointment.type,
                                      notes: appointment.notes || ''
                                    });
                                    setShowForm(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Reschedule
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {patientAppointments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p>No appointments scheduled</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {showForm && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {editingAppointment ? 'Reschedule Appointment' : 'Book New Appointment'}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowForm(false);
                          setEditingAppointment(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctorId">Select Doctor</Label>
                        <Select 
                          value={formData.doctorId} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Appointment Type</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value: 'consultation' | 'follow-up' | 'emergency' | 'check-up') => 
                            setFormData(prev => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="follow-up">Follow-up</SelectItem>
                            <SelectItem value="check-up">Check-up</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Describe your symptoms or reason for visit"
                          rows={3}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        {editingAppointment ? 'Update Appointment' : 'Book Appointment'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}