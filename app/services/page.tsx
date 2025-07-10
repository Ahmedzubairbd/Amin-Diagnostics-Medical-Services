'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Search, 
  Calendar, 
  Brain,
  Eye,
  Bone,
  Baby,
  Stethoscope,
  Activity,
  Pill,
  Microscope,
  Zap,
  Shield,
  Clock,
  Users,
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', count: 24 },
    { id: 'emergency', name: 'Emergency Care', count: 3 },
    { id: 'specialty', name: 'Specialty Care', count: 12 },
    { id: 'diagnostic', name: 'Diagnostic', count: 6 },
    { id: 'preventive', name: 'Preventive Care', count: 3 }
  ];

  const services = [
    {
      id: 1,
      title: "Emergency Medicine",
      category: "emergency",
      icon: <Activity className="w-8 h-8" />,
      description: "24/7 emergency medical care with rapid response team and advanced life support",
      features: ["24/7 Availability", "Trauma Care", "Critical Care", "Ambulance Service"],
      price: "Emergency Rate",
      duration: "Immediate",
      color: "bg-red-50 text-red-600 border-red-200",
      availability: "Available Now"
    },
    {
      id: 2,
      title: "Cardiology",
      category: "specialty",
      icon: <Heart className="w-8 h-8" />,
      description: "Comprehensive heart care including diagnostics, treatment, and cardiac surgery",
      features: ["ECG/EKG", "Echocardiogram", "Cardiac Catheterization", "Heart Surgery"],
      price: "৳2,500 - ৳5,000",
      duration: "45-60 min",
      color: "bg-red-50 text-red-600 border-red-200",
      availability: "Mon, Wed, Fri"
    },
    {
      id: 3,
      title: "Neurology",
      category: "specialty",
      icon: <Brain className="w-8 h-8" />,
      description: "Expert care for brain, spine, and nervous system disorders",
      features: ["Brain MRI", "EEG", "Neurological Exams", "Stroke Care"],
      price: "৳3,000 - ৳6,000",
      duration: "60-90 min",
      color: "bg-purple-50 text-purple-600 border-purple-200",
      availability: "Tue, Thu, Sat"
    },
    {
      id: 4,
      title: "Ophthalmology",
      category: "specialty",
      icon: <Eye className="w-8 h-8" />,
      description: "Complete eye care from routine exams to complex eye surgeries",
      features: ["Eye Exams", "Cataract Surgery", "Retinal Care", "Glaucoma Treatment"],
      price: "৳1,500 - ৳4,000",
      duration: "30-45 min",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      availability: "Daily"
    },
    {
      id: 5,
      title: "Orthopedics",
      category: "specialty",
      icon: <Bone className="w-8 h-8" />,
      description: "Bone, joint, and muscle care including sports medicine and surgery",
      features: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Arthroscopy"],
      price: "৳2,000 - ৳8,000",
      duration: "45-60 min",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      availability: "Mon-Fri"
    },
    {
      id: 6,
      title: "Pediatrics",
      category: "specialty",
      icon: <Baby className="w-8 h-8" />,
      description: "Specialized medical care for infants, children, and adolescents",
      features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring", "Pediatric Surgery"],
      price: "৳1,200 - ৳3,000",
      duration: "30-45 min",
      color: "bg-pink-50 text-pink-600 border-pink-200",
      availability: "Daily"
    },
    {
      id: 7,
      title: "Internal Medicine",
      category: "specialty",
      icon: <Stethoscope className="w-8 h-8" />,
      description: "Comprehensive adult medical care and chronic disease management",
      features: ["Health Screenings", "Chronic Disease Care", "Preventive Medicine", "Annual Physicals"],
      price: "৳1,500 - ৳3,500",
      duration: "45-60 min",
      color: "bg-green-50 text-green-600 border-green-200",
      availability: "Mon-Sat"
    },
    {
      id: 8,
      title: "Laboratory Services",
      category: "diagnostic",
      icon: <Microscope className="w-8 h-8" />,
      description: "Comprehensive laboratory testing with quick and accurate results",
      features: ["Blood Tests", "Urine Analysis", "Microbiology", "Pathology"],
      price: "৳500 - ৳2,500",
      duration: "15-30 min",
      color: "bg-teal-50 text-teal-600 border-teal-200",
      availability: "Daily"
    },
    {
      id: 9,
      title: "Radiology & Imaging",
      category: "diagnostic",
      icon: <Zap className="w-8 h-8" />,
      description: "Advanced imaging services including X-ray, CT, MRI, and ultrasound",
      features: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
      price: "৳1,000 - ৳8,000",
      duration: "20-60 min",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      availability: "Daily"
    },
    {
      id: 10,
      title: "Pharmacy Services",
      category: "specialty",
      icon: <Pill className="w-8 h-8" />,
      description: "Full-service pharmacy with prescription medications and health products",
      features: ["Prescription Filling", "Medication Counseling", "Health Products", "Home Delivery"],
      price: "As per medication",
      duration: "10-15 min",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      availability: "Daily"
    },
    {
      id: 11,
      title: "Preventive Care",
      category: "preventive",
      icon: <Shield className="w-8 h-8" />,
      description: "Comprehensive preventive healthcare services and health screenings",
      features: ["Health Screenings", "Vaccinations", "Wellness Programs", "Health Education"],
      price: "৳800 - ৳2,000",
      duration: "30-45 min",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
      availability: "Mon-Fri"
    },
    {
      id: 12,
      title: "Telemedicine",
      category: "specialty",
      icon: <Activity className="w-8 h-8" />,
      description: "Remote healthcare consultations via video calls and digital platforms",
      features: ["Video Consultations", "Remote Monitoring", "Digital Prescriptions", "Follow-up Care"],
      price: "৳800 - ৳1,500",
      duration: "20-30 min",
      color: "bg-violet-50 text-violet-600 border-violet-200",
      availability: "24/7"
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Amin Diagnostics</h1>
                <p className="text-xs text-gray-500">Your Health, Our Priority</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/services" className="text-blue-600 font-medium">Services</Link>
              <Link href="/find-a-doctor" className="text-gray-700 hover:text-blue-600 transition-colors">Find A Doctor</Link>
              <Link href="/locations" className="text-gray-700 hover:text-blue-600 transition-colors">Locations</Link>
              <Link href="/about-us" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
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
            Our Medical Services
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by expert medical professionals 
            across Jhineidah and Kushtia districts
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search services, treatments, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {serviceCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardHeader className={`${service.color} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {service.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-sm text-gray-500">Starting from</div>
                        <div className="font-semibold text-gray-900">{service.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-semibold text-gray-900">{service.duration}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Link href="/patient/login" className="flex-1">
                      <Button className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing a Service?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our healthcare coordinators are here to help you find the right care for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-a-doctor">
              <Button size="lg" variant="secondary">
                <Users className="w-5 h-5 mr-2" />
                Find A Doctor
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Activity className="w-5 h-5 mr-2" />
              Emergency Care
            </Button>
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
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Emergency Care</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Specialty Care</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Diagnostic Services</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Preventive Care</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white transition-colors">Find A Doctor</Link></li>
                <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/patient/login" className="text-gray-400 hover:text-white transition-colors">Patient Portal</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Emergency: +880 1234-567890</p>
                <p>Appointments: +880 1234-567891</p>
                <p>info@healthcareplus.com</p>
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