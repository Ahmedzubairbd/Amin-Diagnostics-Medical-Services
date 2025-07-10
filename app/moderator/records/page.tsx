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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Search, Edit, X, Calendar, User } from 'lucide-react';

export default function ModeratorRecords() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { medicalRecords, patients, doctors, addMedicalRecord, updateMedicalRecord } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    type: 'diagnosis' as 'diagnosis' | 'prescription' | 'lab-result' | 'imaging',
    title: '',
    description: '',
    attachments: [] as string[]
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'moderator') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        patientId: editingRecord.patientId,
        doctorId: editingRecord.doctorId,
        date: editingRecord.date,
        type: editingRecord.type,
        title: editingRecord.title,
        description: editingRecord.description,
        attachments: editingRecord.attachments || []
      });
    } else {
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        type: 'diagnosis',
        title: '',
        description: '',
        attachments: []
      });
    }
  }, [editingRecord]);

  const filteredRecords = medicalRecords.filter(record => {
    const patient = patients.find(p => p.id === record.patientId);
    const doctor = doctors.find(d => d.id === record.doctorId);
    
    return patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      updateMedicalRecord(editingRecord.id, formData);
    } else {
      addMedicalRecord(formData);
    }
    setShowForm(false);
    setEditingRecord(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'diagnosis': return 'bg-red-100 text-red-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'lab-result': return 'bg-blue-100 text-blue-800';
      case 'imaging': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diagnosis': return '🩺';
      case 'prescription': return '💊';
      case 'lab-result': return '🧪';
      case 'imaging': return '📷';
      default: return '📄';
    }
  };

  if (!isAuthenticated || user?.role !== 'moderator') {
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
              <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
              <p className="text-gray-600 mt-2">Manage patient medical records and documentation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>All Medical Records</span>
                      </CardTitle>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Record</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search records by patient, doctor, title, or type..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredRecords.map((record) => {
                        const patient = patients.find(p => p.id === record.patientId);
                        const doctor = doctors.find(d => d.id === record.doctorId);
                        
                        return (
                          <div key={record.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                                  {getTypeIcon(record.type)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{record.title}</h3>
                                  <p className="text-sm text-gray-600">Patient: {patient?.name}</p>
                                  <p className="text-xs text-gray-500">Doctor: {doctor?.name}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(record.type)}>
                                  {record.type}
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setEditingRecord(record);
                                    setShowForm(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{record.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{doctor?.specialization}</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 line-clamp-2">
                              {record.description}
                            </p>

                            {record.attachments && record.attachments.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">
                                  {record.attachments.length} attachment(s)
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {filteredRecords.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p>No medical records found</p>
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
                        {editingRecord ? 'Edit Medical Record' : 'Add New Medical Record'}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowForm(false);
                          setEditingRecord(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientId">Patient</Label>
                        <Select 
                          value={formData.patientId} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, patientId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctorId">Doctor</Label>
                        <Select 
                          value={formData.doctorId} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
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
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Record Type</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value: 'diagnosis' | 'prescription' | 'lab-result' | 'imaging') => 
                            setFormData(prev => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diagnosis">Diagnosis</SelectItem>
                            <SelectItem value="prescription">Prescription</SelectItem>
                            <SelectItem value="lab-result">Lab Result</SelectItem>
                            <SelectItem value="imaging">Imaging</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        {editingRecord ? 'Update Record' : 'Add Record'}
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