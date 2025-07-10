'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pill, Calendar, User, Clock, RefreshCw, Search } from 'lucide-react';

export default function PatientMedications() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { prescriptions, doctors } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const patientPrescriptions = prescriptions.filter(prescription => 
    prescription.patientId === user?.id &&
    (prescription.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     prescription.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRefillStatus = (refills: number) => {
    if (refills === 0) return { color: 'bg-red-100 text-red-800', text: 'No refills' };
    if (refills <= 2) return { color: 'bg-yellow-100 text-yellow-800', text: `${refills} refills left` };
    return { color: 'bg-green-100 text-green-800', text: `${refills} refills left` };
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
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
              <h1 className="text-3xl font-bold text-gray-900">My Medications</h1>
              <p className="text-gray-600 mt-2">Track your prescriptions and medication schedule</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5" />
                    <span>Current Prescriptions</span>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search medications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientPrescriptions.map((prescription) => {
                    const doctor = doctors.find(d => d.id === prescription.doctorId);
                    const refillStatus = getRefillStatus(prescription.refillsRemaining);
                    const expiringSoon = prescription.endDate && isExpiringSoon(prescription.endDate);
                    
                    return (
                      <div key={prescription.id} className={`p-6 border rounded-lg transition-all ${
                        expiringSoon ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 hover:shadow-md'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                              <Pill className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {prescription.medicationName}
                              </h3>
                              <p className="text-sm text-gray-600">{prescription.dosage}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Prescribed by {doctor?.name}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                            <Badge className={refillStatus.color}>
                              {refillStatus.text}
                            </Badge>
                          </div>
                        </div>

                        {expiringSoon && (
                          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                Prescription expires soon! Contact your doctor for renewal.
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Frequency</h4>
                            <p className="text-sm text-gray-600">{prescription.frequency}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Duration</h4>
                            <p className="text-sm text-gray-600">{prescription.duration}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Start Date</h4>
                            <p className="text-sm text-gray-600">{prescription.startDate}</p>
                          </div>
                        </div>

                        {prescription.instructions && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                              {prescription.instructions}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Started: {prescription.startDate}</span>
                            </div>
                            {prescription.endDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Ends: {prescription.endDate}</span>
                              </div>
                            )}
                          </div>

                          {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Request Refill
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {patientPrescriptions.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Medications</h3>
                      <p>You don't have any active prescriptions.</p>
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