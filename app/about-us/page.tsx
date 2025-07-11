'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageToggle from '@/components/LanguageToggle';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  Award,
  Shield,
  Target,
  Globe,
  Stethoscope,
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, respect, and dignity, ensuring they feel valued and cared for throughout their healthcare journey.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Excellence & Safety",
      description: "We maintain the highest standards of medical excellence and patient safety through continuous improvement and evidence-based practices.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Approach",
      description: "We believe in teamwork and collaboration among healthcare professionals to provide comprehensive and coordinated care.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation & Progress",
      description: "We embrace cutting-edge technology and innovative treatments to deliver the most effective healthcare solutions.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const achievements = [
    {
      number: "50,000+",
      label: "Patients Served",
      description: "Successfully treated patients across both districts"
    },
    {
      number: "200+",
      label: "Medical Professionals",
      description: "Experienced doctors and healthcare staff"
    },
    {
      number: "98%",
      label: "Patient Satisfaction",
      description: "Consistently high patient satisfaction ratings"
    },
    {
      number: "24/7",
      label: "Emergency Services",
      description: "Round-the-clock emergency medical care"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      position: "Chief Medical Officer",
      specialization: "Cardiology",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "15+ years",
      description: "Leading cardiovascular specialist with expertise in interventional cardiology and heart disease prevention."
    },
    {
      name: "Dr. Mohammad Rahman",
      position: "Director of Operations",
      specialization: "Internal Medicine",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "20+ years",
      description: "Experienced healthcare administrator focused on improving patient care delivery and operational efficiency."
    },
    {
      name: "Dr. Fatima Khan",
      position: "Head of Pediatrics",
      specialization: "Pediatrics",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "12+ years",
      description: "Dedicated pediatrician committed to providing comprehensive healthcare for children and adolescents."
    }
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System" },
    { name: "JCI Accredited", description: "Joint Commission International" },
    { name: "HIPAA Compliant", description: "Health Information Privacy" },
    { name: "WHO Standards", description: "World Health Organization Guidelines" }
  ];

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/about-us" className="text-blue-600 font-medium">About Us</Link>
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
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Amin Diagnostics
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Dedicated to providing exceptional healthcare services across Jhineidah and Kushtia districts 
              with compassion, expertise, and cutting-edge medical technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-6">
                🎯 Our Purpose
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mission & Vision</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-6 h-6 text-blue-600 mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide accessible, high-quality healthcare services that improve the health and well-being 
                    of our communities in Jhineidah and Kushtia districts. We are committed to delivering 
                    patient-centered care with compassion, integrity, and excellence.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe className="w-6 h-6 text-green-600 mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading healthcare provider in Bangladesh, recognized for our innovative approach, 
                    exceptional patient outcomes, and commitment to advancing medical science while making 
                    healthcare accessible to all.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Healthcare Team" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Caring Excellence</div>
                    <div className="text-sm text-gray-600">Since 2010</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-4">
              💎 Our Foundation
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide every decision we make and every interaction we have with patients, 
              families, and communities we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Our Achievements</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Proud milestones that reflect our commitment to excellence in healthcare delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {achievement.number}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-2">
                  {achievement.label}
                </div>
                <div className="text-blue-200 text-sm">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 mb-4">
              👥 Leadership
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced healthcare professionals leading our mission to provide 
              exceptional medical care to our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.specialization}</p>
                  <Badge variant="secondary" className="mb-4">{member.experience}</Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-4">
              🏆 Quality Assurance
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Certifications & Accreditations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is recognized through various national and international 
              certifications and accreditations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Healthcare Family</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the difference that compassionate, expert healthcare can make in your life. 
            We're here to serve you and your family's health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/patient/login">
              <Button size="lg" variant="secondary">
                <Users className="w-5 h-5 mr-2" />
                Become a Patient
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
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
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
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