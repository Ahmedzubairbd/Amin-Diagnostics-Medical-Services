'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import PatientForm from '@/components/Forms/PatientForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Edit, Eye, Phone, Mail } from 'lucide-react';

export default function ModeratorPatients() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { patients, addPatient, updatePatient } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'moderator') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = (patientData) => {
    addPatient(patientData);
    setShowForm(false);
  };

  const handleEditPatient = (patientData) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, patientData);
      setEditingPatient(null);
      setShowForm(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
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
            <PatientForm
              patient={editingPatient}
              onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
              onCancel={() => {
                setShowForm(false);
                setEditingPatient(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
              <p className="text-gray-600 mt-2">Manage patient records and information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>All Patients ({patients.length})</span>
                      </CardTitle>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Patient</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search patients by name, email, or phone..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredPatients.map((patient) => (
                        <div 
                          key={patient.id} 
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {patient.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                                <p className="text-sm text-gray-600">DOB: {patient.dateOfBirth}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Mail className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{patient.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Phone className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{patient.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusBadgeColor(patient.status)}>
                                {patient.status}
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingPatient(patient);
                                  setShowForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {filteredPatients.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p>No patients found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedPatient && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Patient Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-medium text-white">
                          {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{selectedPatient.name}</h3>
                      <Badge className={getStatusBadgeColor(selectedPatient.status)}>
                        {selectedPatient.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Contact Information</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.email}</p>
                        <p className="text-sm text-gray-600">{selectedPatient.phone}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Date of Birth</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.dateOfBirth}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Address</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.address}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.emergencyContact}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Medical History</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.medicalHistory.map((condition, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Allergies</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Last Visit</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.lastVisit}</p>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedPatient(null)}
                    >
                      Close
                    </Button>
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