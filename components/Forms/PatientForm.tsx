'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Patient, useDataStore } from '@/lib/store';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export default function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    medicalHistory: [] as string[],
    currentMedications: [] as string[],
    allergies: [] as string[],
    lastVisit: '',
    nextAppointment: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [newMedicalHistory, setNewMedicalHistory] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory,
        currentMedications: patient.currentMedications,
        allergies: patient.allergies,
        lastVisit: patient.lastVisit,
        nextAppointment: patient.nextAppointment || '',
        status: patient.status
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addToArray = (field: 'medicalHistory' | 'currentMedications' | 'allergies', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      
      if (field === 'medicalHistory') setNewMedicalHistory('');
      if (field === 'currentMedications') setNewMedication('');
      if (field === 'allergies') setNewAllergy('');
    }
  };

  const removeFromArray = (field: 'medicalHistory' | 'currentMedications' | 'allergies', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{patient ? 'Edit Patient' : 'Add New Patient'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastVisit">Last Visit</Label>
              <Input
                id="lastVisit"
                type="date"
                value={formData.lastVisit}
                onChange={(e) => setFormData(prev => ({ ...prev, lastVisit: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextAppointment">Next Appointment</Label>
              <Input
                id="nextAppointment"
                type="date"
                value={formData.nextAppointment}
                onChange={(e) => setFormData(prev => ({ ...prev, nextAppointment: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medical History */}
          <div className="space-y-2">
            <Label>Medical History</Label>
            <div className="flex space-x-2">
              <Input
                value={newMedicalHistory}
                onChange={(e) => setNewMedicalHistory(e.target.value)}
                placeholder="Add medical condition"
              />
              <Button
                type="button"
                onClick={() => addToArray('medicalHistory', newMedicalHistory)}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.medicalHistory.map((condition, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{condition}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('medicalHistory', index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="space-y-2">
            <Label>Current Medications</Label>
            <div className="flex space-x-2">
              <Input
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add medication"
              />
              <Button
                type="button"
                onClick={() => addToArray('currentMedications', newMedication)}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.currentMedications.map((medication, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{medication}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('currentMedications', index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2">
            <Label>Allergies</Label>
            <div className="flex space-x-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy"
              />
              <Button
                type="button"
                onClick={() => addToArray('allergies', newAllergy)}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="flex items-center space-x-1">
                  <span>{allergy}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('allergies', index)}
                    className="ml-1 hover:text-red-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {patient ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}