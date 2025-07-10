'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Building, 
  Stethoscope,
  Activity,
  Calendar,
  Navigation,
  Star,
  Award,
  Ambulance,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function LocationsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('jhineidah');

  const districts = {
    jhineidah: {
      name: "Jhineidah District",
      description: "Comprehensive healthcare services across Jhineidah district with modern medical facilities and expert healthcare professionals.",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: {
        hospitals: 8,
        doctors: 45,
        patients: "25,000+",
        emergencyResponse: "15 min"
      },
      facilities: [
        {
          name: "Jhineidah Medical Center",
          type: "General Hospital",
          address: "Hospital Road, Jhineidah Sadar",
          phone: "+880 451-62345",
          services: ["Emergency Care", "Surgery", "ICU", "Maternity"],
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
          rating: 4.8,
          image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["24/7 Emergency", "Modern ICU", "Digital X-Ray", "Laboratory"]
        },
        {
          name: "Jhineidah Children's Hospital",
          type: "Specialized Hospital",
          address: "Medical College Road, Jhineidah",
          phone: "+880 451-62346",
          services: ["Pediatric Care", "NICU", "Child Surgery", "Vaccination"],
          specialties: ["Pediatrics", "Neonatology", "Child Psychology"],
          rating: 4.9,
          image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Child-Friendly Environment", "NICU", "Play Therapy", "Family Rooms"]
        },
        {
          name: "Jhineidah Eye Care Center",
          type: "Specialized Clinic",
          address: "Station Road, Jhineidah",
          phone: "+880 451-62347",
          services: ["Eye Exams", "Cataract Surgery", "Retinal Care", "Optical Shop"],
          specialties: ["Ophthalmology", "Optometry"],
          rating: 4.7,
          image: "https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Advanced Equipment", "Same-Day Surgery", "Optical Shop", "Free Screening"]
        },
        {
          name: "Kaliganj Health Complex",
          type: "Upazila Hospital",
          address: "Kaliganj Upazila, Jhineidah",
          phone: "+880 451-62348",
          services: ["General Medicine", "Emergency", "Maternity", "Dental"],
          specialties: ["General Medicine", "Gynecology", "Dentistry"],
          rating: 4.5,
          image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Rural Healthcare", "Mobile Clinic", "Telemedicine", "Community Outreach"]
        }
      ],
      emergencyServices: [
        { name: "Ambulance Service", phone: "+880 451-999", available: "24/7" },
        { name: "Emergency Hotline", phone: "+880 451-911", available: "24/7" },
        { name: "Blood Bank", phone: "+880 451-62349", available: "24/7" },
        { name: "Poison Control", phone: "+880 451-62350", available: "24/7" }
      ]
    },
    kushtia: {
      name: "Kushtia District",
      description: "Advanced healthcare infrastructure serving Kushtia district with state-of-the-art medical technology and specialized care centers.",
      image: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: {
        hospitals: 12,
        doctors: 68,
        patients: "35,000+",
        emergencyResponse: "12 min"
      },
      facilities: [
        {
          name: "Kushtia General Hospital",
          type: "General Hospital",
          address: "Hospital Road, Kushtia Sadar",
          phone: "+880 71-62345",
          services: ["Emergency Care", "Surgery", "ICU", "Dialysis"],
          specialties: ["Cardiology", "Neurology", "Nephrology", "Oncology"],
          rating: 4.9,
          image: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Trauma Center", "CT Scan", "MRI", "Cardiac Cath Lab"]
        },
        {
          name: "Kushtia Heart Institute",
          type: "Specialized Hospital",
          address: "Medical College Road, Kushtia",
          phone: "+880 71-62346",
          services: ["Cardiac Surgery", "Angioplasty", "Pacemaker", "Heart Transplant"],
          specialties: ["Cardiology", "Cardiac Surgery", "Interventional Cardiology"],
          rating: 4.8,
          image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Cardiac ICU", "Cath Lab", "Heart Surgery", "Rehabilitation"]
        },
        {
          name: "Kushtia Cancer Center",
          type: "Specialized Hospital",
          address: "University Road, Kushtia",
          phone: "+880 71-62347",
          services: ["Chemotherapy", "Radiation", "Surgery", "Palliative Care"],
          specialties: ["Oncology", "Radiation Oncology", "Surgical Oncology"],
          rating: 4.7,
          image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Linear Accelerator", "Chemotherapy Unit", "Support Groups", "Research"]
        },
        {
          name: "Kushtia Emergency Medical Center",
          type: "Emergency Hospital",
          address: "Emergency Road, Kushtia",
          phone: "+880 71-62348",
          services: ["24/7 Emergency", "Trauma Care", "Critical Care", "Ambulance"],
          specialties: ["Emergency Medicine", "Critical Care", "Trauma Surgery"],
          rating: 4.9,
          image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=400",
          features: ["Helicopter Pad", "Level 1 Trauma", "Burn Unit", "Poison Control"]
        }
      ],
      emergencyServices: [
        { name: "Ambulance Service", phone: "+880 71-999", available: "24/7" },
        { name: "Emergency Hotline", phone: "+880 71-911", available: "24/7" },
        { name: "Blood Bank", phone: "+880 71-62349", available: "24/7" },
        { name: "Trauma Center", phone: "+880 71-62350", available: "24/7" }
      ]
    }
  };

  const currentDistrict = districts[selectedDistrict];

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
              <Link href="/locations" className="text-blue-600 font-medium">Locations</Link>
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
            Healthcare Locations
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover comprehensive healthcare services across Jhineidah and Kushtia districts. 
            Find the nearest medical facility and access quality healthcare in your area.
          </p>
          
          {/* District Selection */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={selectedDistrict === 'jhineidah' ? 'secondary' : 'outline'}
              size="lg"
              onClick={() => setSelectedDistrict('jhineidah')}
              className={selectedDistrict === 'jhineidah' ? '' : 'text-white border-white hover:bg-white hover:text-blue-600'}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Jhineidah District
            </Button>
            <Button
              variant={selectedDistrict === 'kushtia' ? 'secondary' : 'outline'}
              size="lg"
              onClick={() => setSelectedDistrict('kushtia')}
              className={selectedDistrict === 'kushtia' ? '' : 'text-white border-white hover:bg-white hover:text-blue-600'}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Kushtia District
            </Button>
          </div>
        </div>
      </section>

      {/* District Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentDistrict.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{currentDistrict.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{currentDistrict.stats.hospitals}</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Stethoscope className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{currentDistrict.stats.doctors}</div>
                  <div className="text-sm text-gray-600">Doctors</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{currentDistrict.stats.patients}</div>
                  <div className="text-sm text-gray-600">Patients Served</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{currentDistrict.stats.emergencyResponse}</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={currentDistrict.image} 
                alt={currentDistrict.name}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Quality Assured</div>
                    <div className="text-sm text-gray-600">Certified Healthcare</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Services */}
          <Card className="mb-16 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <Ambulance className="w-6 h-6" />
                <span>Emergency Services - {currentDistrict.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentDistrict.emergencyServices.map((service, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="font-mono text-red-600">{service.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.available}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Healthcare Facilities */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthcare Facilities</h3>
            <p className="text-gray-600">Comprehensive medical facilities serving {currentDistrict.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentDistrict.facilities.map((facility, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-900">{facility.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{facility.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{facility.name}</h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{facility.phone}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Specialties:</h5>
                    <div className="flex flex-wrap gap-1">
                      {facility.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Key Features:</h5>
                    <div className="grid grid-cols-2 gap-1">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-1 text-sm text-gray-600">
                          <Activity className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/patient/login" className="flex-1">
                      <Button className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Medical Assistance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our healthcare network is here to serve you 24/7 across both districts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-a-doctor">
              <Button size="lg" variant="secondary">
                <Stethoscope className="w-5 h-5 mr-2" />
                Find A Doctor
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Ambulance className="w-5 h-5 mr-2" />
              Emergency Services
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
                Serving Jhineidah and Kushtia districts with comprehensive healthcare services.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Jhineidah</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency: +880 451-999</li>
                <li>Appointments: +880 451-62345</li>
                <li>Hospital Road, Jhineidah</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kushtia</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency: +880 71-999</li>
                <li>Appointments: +880 71-62345</li>
                <li>Hospital Road, Kushtia</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/find-a-doctor" className="text-gray-400 hover:text-white transition-colors">Find A Doctor</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/patient/login" className="text-gray-400 hover:text-white transition-colors">Patient Portal</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
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