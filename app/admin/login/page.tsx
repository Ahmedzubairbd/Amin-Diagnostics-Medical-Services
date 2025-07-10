'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Shield,
  Users,
  Calendar,
  FileText,
  Activity,
  ArrowRight,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(loginData.email, loginData.password);
      router.push('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Management",
      description: "Complete control over system users, roles, and permissions"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "System Analytics",
      description: "Comprehensive insights into system performance and usage"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Management",
      description: "Full control over website content and system configurations"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description: "Monitor system health and user activities in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Amin Diagnostics</h1>
                <p className="text-xs text-gray-500">Your Health, Our Priority</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
              <Link href="/find-a-doctor" className="text-gray-700 hover:text-blue-600 transition-colors">Find A Doctor</Link>
              <Link href="/locations" className="text-gray-700 hover:text-blue-600 transition-colors">Locations</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/patient/login">
                <Button variant="outline" size="sm">Patient Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-800 to-red-900 p-12 items-center">
          <div className="max-w-md mx-auto text-white">
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Administrator Portal</h2>
              <p className="text-xl text-red-200">
                Complete system administration with advanced management tools, 
                analytics, and full control over the healthcare platform.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-red-200">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Settings className="w-5 h-5" />
                <span className="font-semibold">Advanced Security</span>
              </div>
              <p className="text-sm text-red-200">
                Multi-layer security with audit logging, role-based access control, 
                and comprehensive system monitoring for maximum protection.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Administrator Access</h1>
              <p className="text-gray-600 mt-2">System administration portal</p>
            </div>

            <Card className="shadow-xl border-0 mb-6">
              <CardHeader>
                <CardTitle>Admin Sign In</CardTitle>
                <CardDescription>
                  Enter your administrator credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
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
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) => setLoginData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-700">
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Demo Access</CardTitle>
                <CardDescription>
                  Use these credentials to explore the admin system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg border bg-red-50 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Administrator</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLoginData(prev => ({ ...prev, email: 'admin@hospital.com', password: 'password' }))}
                      className="text-xs hover:bg-white/50"
                    >
                      Use Credentials
                    </Button>
                  </div>
                  <p className="text-sm mb-3 text-red-700">Full system administration access</p>
                  <div className="text-sm">
                    <div><strong>Email:</strong> admin@hospital.com</div>
                    <div><strong>Password:</strong> password</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Need access? <Link href="/contact" className="text-red-600 hover:text-red-700">Contact IT Support</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}