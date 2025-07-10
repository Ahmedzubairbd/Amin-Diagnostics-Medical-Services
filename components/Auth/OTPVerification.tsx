'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Phone } from 'lucide-react';
import { useDataStore } from '@/lib/store';

interface OTPVerificationProps {
  userId: string;
  phone: string;
  purpose: 'download' | 'login' | 'reset';
  onVerified: () => void;
  onCancel: () => void;
}

export default function OTPVerification({ userId, phone, purpose, onVerified, onCancel }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { generateOTP, verifyOTP } = useDataStore();

  const handleSendOTP = () => {
    setIsLoading(true);
    setError('');
    
    try {
      const generatedOTP = generateOTP(userId, phone, purpose);
      setOtpSent(true);
      // In a real app, this would be sent via SMS service
      alert(`OTP sent to ${phone}: ${generatedOTP} (Demo mode)`);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsLoading(false);
      return;
    }

    const isValid = verifyOTP(userId, otp, purpose);
    
    if (isValid) {
      onVerified();
    } else {
      setError('Invalid or expired OTP. Please try again.');
    }
    
    setIsLoading(false);
  };

  const getPurposeText = () => {
    switch (purpose) {
      case 'download':
        return 'download your medical test results';
      case 'login':
        return 'login to your account';
      case 'reset':
        return 'reset your password';
      default:
        return 'proceed';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold">SMS Verification Required</CardTitle>
          <CardDescription>
            To {getPurposeText()}, please verify your identity with SMS OTP
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Sending OTP to: {phone}</span>
          </div>

          {!otpSent ? (
            <Button 
              onClick={handleSendOTP} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={isLoading || otp.length !== 6}
                  className="flex-1"
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full text-sm"
              >
                Resend OTP
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}