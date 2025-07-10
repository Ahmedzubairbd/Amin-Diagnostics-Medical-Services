'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import DoctorForm from '@/components/Forms/DoctorForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminDoctors() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = (doctorData) => {
    addDoctor(doctorData);
    setShowForm(false);
  };

  const handleEditDoctor = (doctorData) => {
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, doctorData);
      setEditingDoctor(null);
      setShowForm(false);
    }
  };

  const handleDeleteDoctor = (id) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      deleteDoctor(id);
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
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
            <DoctorForm
              doctor={editingDoctor}
              onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
              onCancel={() => {
                setShowForm(false);
                setEditingDoctor(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
              <p className="text-gray-600 mt-2">Manage doctor profiles and information</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5" />
                    <span>All Doctors ({doctors.length})</span>
                  </CardTitle>
                  <Button 
                    className="flex items-center space-x-2"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Doctor</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search doctors by name, specialization, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-white">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-blue-600">{doctor.specialization}</p>
                            <Badge className={getStatusBadgeColor(doctor.status)}>
                              {doctor.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {doctor.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Phone:</span> {doctor.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Experience:</span> {doctor.experience} years
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Availability:</span> {doctor.availability.join(', ')}
                          </p>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingDoctor(doctor);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredDoctors.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No doctors found</p>
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