'use client';

import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  BarChart3, 
  UserPlus, 
  ClipboardList,
  Heart,
  LogOut,
  Home,
  Stethoscope,
  Pill,
  TestTube,
  Edit,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: Users, label: 'Patients', href: '/admin/patients' },
  { icon: Stethoscope, label: 'Doctors', href: '/admin/doctors' },
  { icon: Calendar, label: 'Appointments', href: '/admin/appointments' },
  { icon: TestTube, label: 'Test Results', href: '/admin/tests' },
  { icon: Edit, label: 'CMS', href: '/admin/cms' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const moderatorMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/moderator' },
  { icon: Users, label: 'Patients', href: '/moderator/patients' },
  { icon: Calendar, label: 'Appointments', href: '/moderator/appointments' },
  { icon: FileText, label: 'Medical Records', href: '/moderator/records' },
  { icon: Stethoscope, label: 'Doctors', href: '/moderator/doctors' },
  { icon: MessageSquare, label: 'Messages', href: '/moderator/messages' },
];

const patientMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/patient' },
  { icon: FileText, label: 'Health Records', href: '/patient/records' },
  { icon: Calendar, label: 'Appointments', href: '/patient/appointments' },
  { icon: Pill, label: 'Medications', href: '/patient/medications' },
  { icon: TestTube, label: 'Test Results', href: '/patient/tests' },
  { icon: MessageSquare, label: 'Messages', href: '/patient/messages' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case 'admin':
        return adminMenuItems;
      case 'moderator':
        return moderatorMenuItems;
      case 'patient':
        return patientMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Amin Diagnostics</h2>
            <p className="text-sm text-blue-100 capitalize">{user.role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 shadow-md border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-600'
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-medium text-white">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}