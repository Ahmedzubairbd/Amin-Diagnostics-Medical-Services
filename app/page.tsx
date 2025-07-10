'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Search, 
  Calendar, 
  Shield, 
  Users, 
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Activity,
  Brain,
  Eye,
  Zap,
  Target,
  Globe,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Animated counter effect
  const [counters, setCounters] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const targets = {
      patients: 50000,
      doctors: 200,
      appointments: 15000,
      satisfaction: 98
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        patients: Math.floor(targets.patients * progress),
        doctors: Math.floor(targets.doctors * progress),
        appointments: Math.floor(targets.appointments * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic and treatment options",
      color: "bg-red-50 text-red-600",
      features: ["ECG/EKG", "Echocardiogram", "Cardiac Surgery", "Heart Monitoring"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neurology",
      description: "Expert neurological care for brain and nervous system disorders",
      color: "bg-purple-50 text-purple-600",
      features: ["Brain MRI", "EEG", "Stroke Care", "Neurological Exams"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to complex surgeries",
      color: "bg-blue-50 text-blue-600",
      features: ["Eye Exams", "Cataract Surgery", "Retinal Care", "Vision Correction"]
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response team",
      color: "bg-green-50 text-green-600",
      features: ["24/7 Availability", "Trauma Care", "Critical Care", "Ambulance Service"]
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "General Medicine",
      description: "Comprehensive primary healthcare and preventive medicine services",
      color: "bg-teal-50 text-teal-600",
      features: ["Health Checkups", "Chronic Care", "Preventive Medicine", "Family Medicine"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Diagnostic Services",
      description: "Advanced diagnostic imaging and laboratory services",
      color: "bg-yellow-50 text-yellow-600",
      features: ["X-Ray", "CT Scan", "MRI", "Laboratory Tests"]
    }
  ];

  const stats = [
    { 
      number: `${counters.patients.toLocaleString()}+`, 
      label: "Patients Served", 
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600"
    },
    { 
      number: `${counters.doctors}+`, 
      label: "Expert Doctors", 
      icon: <Stethoscope className="w-6 h-6" />,
      color: "text-green-600"
    },
    { 
      number: `${counters.appointments.toLocaleString()}+`, 
      label: "Appointments", 
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-600"
    },
    { 
      number: `${counters.satisfaction}%`, 
      label: "Patient Satisfaction", 
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-600"
    }
  ];

  const features = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Precision Medicine",
      description: "Personalized treatment plans based on individual patient needs and medical history"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Telemedicine",
      description: "Remote consultations and follow-ups from the comfort of your home"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Data Security",
      description: "HIPAA-compliant security measures to protect your medical information"
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "24/7 Support",
      description: "Round-the-clock patient support and emergency response services"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      location: "Jhineidah",
      rating: 5,
      comment: "Excellent healthcare services. The doctors are very professional and caring.",
      service: "Cardiology",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Mohammad Rahman",
      location: "Kushtia",
      rating: 5,
      comment: "Quick appointment booking and great medical care. Highly recommended!",
      service: "General Medicine",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Fatima Khan",
      location: "Jhineidah",
      rating: 5,
      comment: "The emergency services saved my life. Forever grateful to the medical team.",
      service: "Emergency Care",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Amin Diagnostics</h1>
                <p className="text-xs text-gray-500">Your Health, Our Priority</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-blue-600 font-medium">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
              <Link href="/find-a-doctor" className="text-gray-700 hover:text-blue-600 transition-colors">Find A Doctor</Link>
              <Link href="/locations" className="text-gray-700 hover:text-blue-600 transition-colors">Locations</Link>
              <Link href="/about-us" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/admin/login">
                <Button variant="outline" size="sm">Portal Login</Button>
              </Link>
              <Link href="/moderator/login">
                <Button size="sm">Staff Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-600 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-red-600 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-green-800 px-4 py-2 animate-pulse">
                  🏥 Trusted Healthcare Provider
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health is Our
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Priority</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Experience world-class healthcare services in Jhineidah and Kushtia districts. 
                  Our expert medical team is dedicated to providing compassionate care with cutting-edge technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/find-a-doctor">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
                    <Search className="w-5 h-5 mr-2" />
                    Find A Doctor
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Certified Excellence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">24/7 Available</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Healthcare Professional" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-200 to-green-200 rounded-2xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl -z-10 animate-pulse"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 bg-white p-4 rounded-xl shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Heart Rate</div>
                    <div className="text-sm text-gray-600">72 BPM</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Health Score</div>
                    <div className="text-sm text-gray-600">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-green-600">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Find Healthcare Services</h2>
                <p className="text-blue-100">Search for doctors, services, or locations</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search doctors, specialties, or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white"
                  />
                </div>
                <Link href={`/find-a-doctor?search=${searchTerm}`}>
                  <Button size="lg" variant="secondary" className="w-full md:w-auto">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-4">
              🩺 Medical Excellence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive healthcare services delivered by expert medical professionals 
              using state-of-the-art technology and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 group-hover:bg-blue-50">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-4">
              ⚡ Advanced Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Amin Diagnostics</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Experience the future of healthcare with our innovative features and patient-centered approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-600 group-hover:text-green-600 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Amin's Excellence in Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Trusted by thousands across Jhineidah and Kushtia districts with proven results and exceptional care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className={`${stat.color} group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-4">
              ⭐ Patient Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from our valued patients who trust us with their healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.comment}"</p>
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-4">{testimonial.service}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their healthcare needs.
          </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Appointment
              </Button>
            </Link>
            <Link href="/locations">
                <Button size="lg" variant="outline" className="hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 px-8 py-4">
                <MapPin className="w-5 h-5 mr-2" />
                Find Nearest Location
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Amin Diagnostics</h3>
                  <p className="text-sm text-gray-400">Your Health, Our Priority</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Providing exceptional healthcare services across Jhineidah and Kushtia districts 
                with compassion, expertise, and cutting-edge technology.
              </p>
              
              <div className="flex space-x-4 pt-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Our Services</Link></li>
                <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white transition-colors">Find A Doctor</Link></li>
                <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Admin-Moderator & Patient Portal</h4>
              <ul className="space-y-2">
                <li><Link href="/moderator/login" className="text-gray-400 hover:text-white transition-colors">Moderator Login</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Register Demo</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Test Results</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+880 1521-414531</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">info@amindiagnostics.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">Jhineidah & Kushtia, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">24/7 Emergency Services</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <Badge className="bg-green-100 text-green-800">ISO 9001:2015 Certified</Badge>
                <Badge className="bg-blue-100 text-blue-800">HIPAA Compliant</Badge>
                <Badge className="bg-purple-100 text-purple-800">JCI Accredited</Badge>
              </div>
            <p className="text-gray-400">
                © 2025 Amin Diagnostics. All rights reserved. | 
                <Link href="/privacy" className="hover:text-white transition-colors"> Privacy Policy</Link> | 
                <Link href="/terms" className="hover:text-white transition-colors"> Terms of Service</Link>
            </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
