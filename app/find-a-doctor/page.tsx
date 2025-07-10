'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Search, 
  Calendar, 
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Award,
  Users,
  Filter,
  SortAsc,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function FindDoctorPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'cardiology', name: 'Cardiology', icon: <Heart className="w-4 h-4" /> },
    { id: 'neurology', name: 'Neurology', icon: <Brain className="w-4 h-4" /> },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: <Eye className="w-4 h-4" /> },
    { id: 'orthopedics', name: 'Orthopedics', icon: <Bone className="w-4 h-4" /> },
    { id: 'pediatrics', name: 'Pediatrics', icon: <Baby className="w-4 h-4" /> },
    { id: 'emergency', name: 'Emergency Medicine', icon: <Activity className="w-4 h-4" /> },
    { id: 'internal', name: 'Internal Medicine', icon: <Stethoscope className="w-4 h-4" /> }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'jhineidah', name: 'Jhineidah District' },
    { id: 'kushtia', name: 'Kushtia District' },
    { id: 'jhineidah-city', name: 'Jhineidah City' },
    { id: 'kushtia-city', name: 'Kushtia City' },
    { id: 'kaliganj', name: 'Kaliganj' },
    { id: 'shailkupa', name: 'Shailkupa' }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialty: "cardiology",
      location: "jhineidah-city",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 156,
      experience: 15,
      education: "MBBS, MD (Cardiology) - Dhaka Medical College",
      languages: ["Bengali", "English"],
      availability: ["Monday", "Wednesday", "Friday"],
      nextAvailable: "Tomorrow 10:00 AM",
      consultationFee: "৳3,500",
      about: "Experienced cardiologist specializing in heart disease prevention, diagnosis, and treatment. Expert in cardiac catheterization and interventional cardiology.",
      services: ["ECG", "Echocardiogram", "Cardiac Catheterization", "Heart Surgery Consultation"],
      hospital: "Jhineidah Medical Center",
      phone: "+880 1234-567890",
      email: "dr.sarah@healthcareplus.com"
    },
    {
      id: 2,
      name: "Dr. Mohammad Rahman",
      specialty: "neurology",
      location: "kushtia-city",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 203,
      experience: 12,
      education: "MBBS, MD (Neurology) - Bangabandhu Sheikh Mujib Medical University",
      languages: ["Bengali", "English", "Hindi"],
      availability: ["Tuesday", "Thursday", "Saturday"],
      nextAvailable: "Today 2:00 PM",
      consultationFee: "৳4,000",
      about: "Neurologist with expertise in treating brain, spine, and nervous system disorders. Specialized in stroke care and neurological rehabilitation.",
      services: ["Brain MRI", "EEG", "Neurological Examination", "Stroke Treatment"],
      hospital: "Kushtia General Hospital",
      phone: "+880 1234-567891",
      email: "dr.rahman@healthcareplus.com"
    },
    {
      id: 3,
      name: "Dr. Fatima Khan",
      specialty: "pediatrics",
      location: "jhineidah",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 189,
      experience: 10,
      education: "MBBS, DCH, MD (Pediatrics) - Chittagong Medical College",
      languages: ["Bengali", "English"],
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      nextAvailable: "Tomorrow 9:00 AM",
      consultationFee: "৳2,500",
      about: "Dedicated pediatrician providing comprehensive healthcare for children from birth to adolescence. Expert in child development and pediatric emergencies.",
      services: ["Well-Child Visits", "Vaccinations", "Growth Assessment", "Pediatric Emergencies"],
      hospital: "Jhineidah Children's Hospital",
      phone: "+880 1234-567892",
      email: "dr.fatima@healthcareplus.com"
    },
    {
      id: 4,
      name: "Dr. Ahmed Hassan",
      specialty: "orthopedics",
      location: "kushtia",
      image: "https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 142,
      experience: 18,
      education: "MBBS, MS (Orthopedics) - Sir Salimullah Medical College",
      languages: ["Bengali", "English"],
      availability: ["Monday", "Wednesday", "Friday", "Saturday"],
      nextAvailable: "Tomorrow 11:00 AM",
      consultationFee: "৳3,000",
      about: "Orthopedic surgeon specializing in joint replacement, sports medicine, and trauma care. Expert in minimally invasive surgical techniques.",
      services: ["Joint Replacement", "Sports Medicine", "Fracture Treatment", "Arthroscopy"],
      hospital: "Kushtia Orthopedic Center",
      phone: "+880 1234-567893",
      email: "dr.ahmed@healthcareplus.com"
    },
    {
      id: 5,
      name: "Dr. Rashida Begum",
      specialty: "ophthalmology",
      location: "jhineidah-city",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 167,
      experience: 14,
      education: "MBBS, DO, MS (Ophthalmology) - Dhaka Medical College",
      languages: ["Bengali", "English"],
      availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      nextAvailable: "Today 3:30 PM",
      consultationFee: "৳2,800",
      about: "Ophthalmologist with expertise in cataract surgery, retinal diseases, and comprehensive eye care. Committed to preserving and improving vision.",
      services: ["Cataract Surgery", "Retinal Treatment", "Glaucoma Care", "Eye Exams"],
      hospital: "Jhineidah Eye Care Center",
      phone: "+880 1234-567894",
      email: "dr.rashida@healthcareplus.com"
    },
    {
      id: 6,
      name: "Dr. Karim Uddin",
      specialty: "emergency",
      location: "kushtia-city",
      image: "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 234,
      experience: 16,
      education: "MBBS, FCPS (Emergency Medicine) - Armed Forces Medical College",
      languages: ["Bengali", "English"],
      availability: ["24/7"],
      nextAvailable: "Available Now",
      consultationFee: "Emergency Rate",
      about: "Emergency medicine specialist with extensive experience in critical care and trauma management. Available 24/7 for emergency consultations.",
      services: ["Emergency Care", "Trauma Management", "Critical Care", "Life Support"],
      hospital: "Kushtia Emergency Medical Center",
      phone: "+880 1234-567895",
      email: "dr.karim@healthcareplus.com"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'fee':
        return parseInt(a.consultationFee.replace(/[^\d]/g, '')) - parseInt(b.consultationFee.replace(/[^\d]/g, ''));
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
              <Link href="/find-a-doctor" className="text-blue-600 font-medium">Find A Doctor</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Doctor
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect with experienced healthcare professionals in Jhineidah and Kushtia districts. 
              Book appointments with qualified doctors who care about your health.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="max-w-6xl mx-auto shadow-xl border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search doctors, specialties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        <div className="flex items-center space-x-2">
                          {specialty.icon}
                          <span>{specialty.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                    <SelectItem value="fee">Consultation Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {sortedDoctors.length} Doctors Found
              </h2>
              <p className="text-gray-600">
                {selectedSpecialty !== 'all' && `Specialty: ${specialties.find(s => s.id === selectedSpecialty)?.name}`}
                {selectedLocation !== 'all' && ` • Location: ${locations.find(l => l.id === selectedLocation)?.name}`}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <SortAsc className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Sorted by {sortBy}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedDoctors.map((doctor) => (
              <Card key={doctor.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-blue-600 font-medium capitalize">
                            {specialties.find(s => s.id === doctor.specialty)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{doctor.rating}</span>
                            <span className="text-gray-500">({doctor.reviews})</span>
                          </div>
                          <p className="text-sm text-gray-600">{doctor.experience} years exp.</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Next available: {doctor.nextAvailable}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>Fee: {doctor.consultationFee}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{doctor.about}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {doctor.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {doctor.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doctor.services.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link href="/patient/login" className="flex-1">
                          <Button className="w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Appointment
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedDoctors.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('all');
                setSelectedLocation('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find the Right Doctor?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our healthcare coordinators can help you find the perfect specialist for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +880 1234-567890
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
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
                Connecting patients with qualified healthcare professionals across Bangladesh.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Specialties</h4>
              <ul className="space-y-2">
                <li><Link href="/find-a-doctor?specialty=cardiology" className="text-gray-400 hover:text-white transition-colors">Cardiology</Link></li>
                <li><Link href="/find-a-doctor?specialty=neurology" className="text-gray-400 hover:text-white transition-colors">Neurology</Link></li>
                <li><Link href="/find-a-doctor?specialty=pediatrics" className="text-gray-400 hover:text-white transition-colors">Pediatrics</Link></li>
                <li><Link href="/find-a-doctor?specialty=orthopedics" className="text-gray-400 hover:text-white transition-colors">Orthopedics</Link></li>
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