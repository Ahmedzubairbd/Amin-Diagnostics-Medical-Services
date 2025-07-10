'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Ambulance,
  Calendar,
  Users,
  Building,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: [
        { label: "Emergency", value: "+880 1234-567890", urgent: true },
        { label: "Appointments", value: "+880 1234-567891" },
        { label: "General Inquiry", value: "+880 1234-567892" }
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Addresses",
      details: [
        { label: "General", value: "info@healthcareplus.com" },
        { label: "Appointments", value: "appointments@healthcareplus.com" },
        { label: "Support", value: "support@healthcareplus.com" }
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Locations",
      details: [
        { label: "Jhineidah", value: "Hospital Road, Jhineidah Sadar" },
        { label: "Kushtia", value: "Medical College Road, Kushtia" },
        { label: "Emergency", value: "Both locations - 24/7" }
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Operating Hours",
      details: [
        { label: "Emergency", value: "24/7 - All Days", urgent: true },
        { label: "OPD", value: "8:00 AM - 8:00 PM" },
        { label: "Admin", value: "9:00 AM - 5:00 PM" }
      ]
    }
  ];

  const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "appointments", label: "Appointments" },
    { value: "emergency", label: "Emergency" },
    { value: "billing", label: "Billing & Insurance" },
    { value: "feedback", label: "Feedback & Complaints" },
    { value: "careers", label: "Careers" },
    { value: "media", label: "Media & Press" }
  ];

  const quickActions = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Book Appointment",
      description: "Schedule your visit with our specialists",
      action: "Book Now",
      href: "/patient/login",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Services",
      description: "24/7 emergency medical assistance",
      action: "Call Now",
      href: "tel:+8801234567890",
      color: "bg-red-50 text-red-600 border-red-200"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient Portal",
      description: "Access your medical records and results",
      action: "Login",
      href: "/patient/login",
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Find Locations",
      description: "Locate our healthcare facilities",
      action: "View Map",
      href: "/locations",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              <Link href="/about-us" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/patient/login">
                <Button variant="outline" size="sm">Patient Portal</Button>
              </Link>
              <Link href="/moderator/login">
                <Button size="sm">Staff Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help you with any questions, concerns, or healthcare needs. 
            Reach out to us through any of the convenient methods below.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className={`${action.color} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-sm mb-4 opacity-80">{action.description}</p>
                  <Link href={action.href}>
                    <Button variant="outline" size="sm" className="w-full">
                      {action.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select 
                            value={formData.department} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select 
                            value={formData.priority} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
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
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          placeholder="Please describe your inquiry in detail..."
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {info.icon}
                      </div>
                      <span>{info.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{detail.label}:</span>
                          <span className={`text-sm font-medium ${detail.urgent ? 'text-red-600' : 'text-gray-900'}`}>
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Emergency Notice */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Ambulance className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Medical Emergency?</h3>
                      <p className="text-red-700 text-sm mb-3">
                        For life-threatening emergencies, call immediately or visit our emergency department.
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Emergency: +880 1234-567890
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Visit our healthcare facilities in Jhineidah and Kushtia districts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Jhineidah Medical Center</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">Hospital Road, Jhineidah Sadar</p>
                  <p className="text-gray-600">Jhineidah District, Bangladesh</p>
                  <p className="text-blue-600">+880 451-62345</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>Kushtia General Hospital</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">Medical College Road, Kushtia</p>
                  <p className="text-gray-600">Kushtia District, Bangladesh</p>
                  <p className="text-green-600">+880 71-62345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
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
              <p className="text-gray-400">
                Providing exceptional healthcare services across Jhineidah and Kushtia districts.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white transition-colors">Find A Doctor</Link></li>
                <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Patient Care</h4>
              <ul className="space-y-2">
                <li><Link href="/patient/login" className="text-gray-400 hover:text-white transition-colors">Patient Portal</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Medical Services</Link></li>
                <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Emergency Care</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+880 1234-567890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@healthcareplus.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jhineidah & Kushtia, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 Amin Diagnostics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}