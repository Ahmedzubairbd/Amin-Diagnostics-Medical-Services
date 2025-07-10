'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Heart,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function PatientLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(loginData.email, loginData.password);
      router.push('/patient');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!registerData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        'Registration successful! Please check your email for verification.'
      );
      // In a real app, redirect to email verification page
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Easy Appointment Booking',
      description:
        'Schedule appointments with your preferred doctors instantly',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Health Records',
      description: 'Access your complete medical history securely online',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telemedicine Support',
      description: 'Consult with doctors remotely via video calls',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Test Results',
      description: 'View and download your lab results instantly',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Amin Diagnostics
                </h1>
                <p className="text-xs text-gray-500">
                  Your Health, Our Priority
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/find-a-doctor"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Find A Doctor
              </Link>
              <Link
                href="/locations"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Locations
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/moderator/login">
                <Button variant="outline" size="sm">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 p-12 items-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="max-w-md mx-auto text-white relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Welcome to Your Health Portal
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Manage appointments, view records, and connect with healthcare
              professionals.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">HIPAA Compliant</span>
              </div>
              <p className="text-sm text-blue-100">
                Your health information is protected with enterprise-grade
                security and encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Patient Portal
              </h1>
              <p className="text-gray-600">
                Access your personalized healthcare dashboard
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                      Sign in to access your health dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className="pl-10 pr-10 h-12"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            checked={loginData.rememberMe}
                            onCheckedChange={(checked) =>
                              setLoginData((prev) => ({
                                ...prev,
                                rememberMe: checked as boolean,
                              }))
                            }
                          />
                          <Label htmlFor="remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-4 rounded-lg border border-red-200">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 text-center mb-3">
                        Demo Credentials:
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                        <div className="text-sm">
                          <div>
                            <strong>Email:</strong> patient@email.com
                          </div>
                          <div>
                            <strong>Password:</strong> password
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>
                      Join our healthcare platform to access personalized care
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="First name"
                            value={registerData.firstName}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            className="h-12"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            value={registerData.lastName}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="registerEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+880 1234-567890"
                            value={registerData.phone}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={registerData.dateOfBirth}
                          onChange={(e) =>
                            setRegisterData((prev) => ({
                              ...prev,
                              dateOfBirth: e.target.value,
                            }))
                          }
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="address"
                            placeholder="Your address"
                            value={registerData.address}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerPassword">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="registerPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={registerData.password}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className="pl-10 pr-10 h-12"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={registerData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setRegisterData((prev) => ({
                              ...prev,
                              agreeToTerms: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{' '}
                          <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-4 rounded-lg border border-red-200">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
