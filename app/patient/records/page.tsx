'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore, MedicalRecord } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, Search, Download, Eye } from 'lucide-react';

export default function PatientRecords() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { medicalRecords, doctors } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const patientRecords = medicalRecords.filter(record => 
    record.patientId === user?.id &&
    (record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
              <p className="text-gray-600 mt-2">View your complete medical history and records</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Medical Records</span>
                      </CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search records..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientRecords.map((record) => {
                        const doctor = doctors.find(d => d.id === record.doctorId);
                        return (
                          <div 
                            key={record.id} 
                            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                                  {getTypeIcon(record.type)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{record.title}</h3>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{doctor?.name}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end space-y-2">
                                <Badge className={getTypeColor(record.type)}>
                                  {record.type}
                                </Badge>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  <span>{record.date}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {record.description}
                            </p>

                            <div className="flex justify-end mt-3">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}

                      {patientRecords.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No Medical Records</h3>
                          <p>Your medical records will appear here once available.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedRecord && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(selectedRecord.type)}</span>
                      <span>Record Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedRecord.title}</h3>
                      <Badge className={getTypeColor(selectedRecord.type)}>
                        {selectedRecord.type}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Date</h4>
                      <p className="text-sm text-gray-600">{selectedRecord.date}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Doctor</h4>
                      <p className="text-sm text-gray-600">
                        {doctors.find(d => d.id === selectedRecord.doctorId)?.name}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedRecord.description}
                      </p>
                    </div>

                    {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {selectedRecord.attachments.map((attachment: string, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">Document {index + 1}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedRecord(null)}
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