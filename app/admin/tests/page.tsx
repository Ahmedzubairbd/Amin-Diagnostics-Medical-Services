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
import { TestTube, Plus, Search, Edit, Trash2, X, Calendar, User } from 'lucide-react';

export default function AdminTests() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { testResults, patients, doctors, addTestResult, updateTestResult, deleteTestResult } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    testName: '',
    testType: 'blood' as 'blood' | 'urine' | 'imaging' | 'biopsy' | 'cardiac' | 'other',
    date: '',
    results: '',
    normalRange: '',
    status: 'pending' as 'pending' | 'completed' | 'reviewed',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    notes: '',
    downloadUrl: ''
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (editingTest) {
      setFormData({
        patientId: editingTest.patientId,
        doctorId: editingTest.doctorId,
        testName: editingTest.testName,
        testType: editingTest.testType,
        date: editingTest.date,
        results: editingTest.results,
        normalRange: editingTest.normalRange || '',
        status: editingTest.status,
        priority: editingTest.priority,
        notes: editingTest.notes || '',
        downloadUrl: editingTest.downloadUrl || ''
      });
    } else {
      setFormData({
        patientId: '',
        doctorId: '',
        testName: '',
        testType: 'blood',
        date: '',
        results: '',
        normalRange: '',
        status: 'pending',
        priority: 'normal',
        notes: '',
        downloadUrl: ''
      });
    }
  }, [editingTest]);

  const filteredTests = testResults.filter(test => {
    const patient = patients.find(p => p.id === test.patientId);
    const doctor = doctors.find(d => d.id === test.doctorId);
    
    return patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           test.testType.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTest) {
      updateTestResult(editingTest.id, formData);
    } else {
      addTestResult(formData);
    }
    setShowForm(false);
    setEditingTest(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this test result?')) {
      deleteTestResult(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestTypeIcon = (type: string) => {
    switch (type) {
      case 'blood': return '🩸';
      case 'urine': return '🧪';
      case 'imaging': return '📷';
      case 'cardiac': return '❤️';
      case 'biopsy': return '🔬';
      default: return '🧪';
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
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
              <h1 className="text-3xl font-bold text-gray-900">Test Results Management</h1>
              <p className="text-gray-600 mt-2">Manage patient test results and laboratory data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <TestTube className="w-5 h-5" />
                        <span>All Test Results ({testResults.length})</span>
                      </CardTitle>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Test Result</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search test results by patient, doctor, test name, or type..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredTests.map((test) => {
                        const patient = patients.find(p => p.id === test.patientId);
                        const doctor = doctors.find(d => d.id === test.doctorId);
                        
                        return (
                          <div key={test.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                                  {getTestTypeIcon(test.testType)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{test.testName}</h3>
                                  <p className="text-sm text-gray-600">Patient: {patient?.name}</p>
                                  <p className="text-xs text-gray-500">Doctor: {doctor?.name}</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Badge className={getStatusColor(test.status)}>
                                    {test.status}
                                  </Badge>
                                  <Badge className={getPriorityColor(test.priority)}>
                                    {test.priority}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setEditingTest(test);
                                      setShowForm(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(test.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>Test Date: {test.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="capitalize">{test.testType} test</span>
                              </div>
                            </div>

                            {test.results && (
                              <div className="mb-2">
                                <h4 className="font-medium text-gray-900 text-sm">Results:</h4>
                                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                  {test.results}
                                </p>
                              </div>
                            )}

                            {test.normalRange && (
                              <div className="mb-2">
                                <h4 className="font-medium text-gray-900 text-sm">Normal Range:</h4>
                                <p className="text-sm text-gray-600">{test.normalRange}</p>
                              </div>
                            )}

                            {test.notes && (
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm">Notes:</h4>
                                <p className="text-sm text-gray-700">{test.notes}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {filteredTests.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <TestTube className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p>No test results found</p>
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
                        {editingTest ? 'Edit Test Result' : 'Add New Test Result'}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowForm(false);
                          setEditingTest(null);
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
                        <Label htmlFor="testName">Test Name</Label>
                        <Input
                          id="testName"
                          value={formData.testName}
                          onChange={(e) => setFormData(prev => ({ ...prev, testName: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="testType">Test Type</Label>
                        <Select 
                          value={formData.testType} 
                          onValueChange={(value: 'blood' | 'urine' | 'imaging' | 'biopsy' | 'cardiac' | 'other') => 
                            setFormData(prev => ({ ...prev, testType: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blood">Blood Test</SelectItem>
                            <SelectItem value="urine">Urine Test</SelectItem>
                            <SelectItem value="imaging">Imaging</SelectItem>
                            <SelectItem value="biopsy">Biopsy</SelectItem>
                            <SelectItem value="cardiac">Cardiac Test</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Test Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            value={formData.status} 
                            onValueChange={(value: 'pending' | 'completed' | 'reviewed') => 
                              setFormData(prev => ({ ...prev, status: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select 
                            value={formData.priority} 
                            onValueChange={(value: 'low' | 'normal' | 'high' | 'urgent') => 
                              setFormData(prev => ({ ...prev, priority: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="results">Results</Label>
                        <Textarea
                          id="results"
                          value={formData.results}
                          onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="normalRange">Normal Range</Label>
                        <Input
                          id="normalRange"
                          value={formData.normalRange}
                          onChange={(e) => setFormData(prev => ({ ...prev, normalRange: e.target.value }))}
                          placeholder="e.g., 4.5-11.0 x10³/μL"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="downloadUrl">Download URL</Label>
                        <Input
                          id="downloadUrl"
                          value={formData.downloadUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, downloadUrl: e.target.value }))}
                          placeholder="/downloads/test-result.pdf"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          rows={2}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        {editingTest ? 'Update Test Result' : 'Add Test Result'}
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