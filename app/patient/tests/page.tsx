'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import OTPVerification from '@/components/Auth/OTPVerification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Download, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function PatientTests() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { testResults, doctors } = useDataStore();
  const [showOTP, setShowOTP] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const patientTests = testResults.filter(test => test.patientId === user?.id);

  const handleDownload = (test) => {
    setSelectedTest(test);
    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    setShowOTP(false);
    // Simulate file download
    const link = document.createElement('a');
    link.href = selectedTest?.downloadUrl || '#';
    link.download = `${selectedTest?.testName}-${selectedTest?.date}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Test result downloaded successfully!');
    setSelectedTest(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
              <p className="text-gray-600 mt-2">View and download your medical test results</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5" />
                  <span>My Test Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientTests.map((test) => {
                    const doctor = doctors.find(d => d.id === test.doctorId);
                    return (
                      <div key={test.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                              {getTestTypeIcon(test.testType)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{test.testName}</h3>
                              <p className="text-sm text-gray-600 capitalize">{test.testType} test</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{doctor?.name}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(test.status)}>
                              {test.status}
                            </Badge>
                            <Badge className={getPriorityColor(test.priority)}>
                              {test.priority} priority
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Test Date: {test.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {test.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-sm text-gray-600">
                              Status: {test.status}
                            </span>
                          </div>
                        </div>

                        {test.results && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Results:</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                              {test.results}
                            </p>
                          </div>
                        )}

                        {test.normalRange && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Normal Range:</h4>
                            <p className="text-sm text-gray-600">{test.normalRange}</p>
                          </div>
                        )}

                        {test.notes && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes:</h4>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded">
                              {test.notes}
                            </p>
                          </div>
                        )}

                        {test.status === 'completed' && test.downloadUrl && (
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleDownload(test)}
                              className="flex items-center space-x-2"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Report</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {patientTests.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <TestTube className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Test Results</h3>
                      <p>You don't have any test results yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {showOTP && selectedTest && (
        <OTPVerification
          userId={user!.id}
          phone={user!.phone || '+1-555-0123'}
          purpose="download"
          onVerified={handleOTPVerified}
          onCancel={() => {
            setShowOTP(false);
            setSelectedTest(null);
          }}
        />
      )}
    </div>
  );
}