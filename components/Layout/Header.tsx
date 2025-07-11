'use client';

import { useAuth } from '@/lib/auth';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Brand Logo and Text */}
        <div className="flex items-center space-x-3">
          <img src="../public/dark-logo.svg" alt="Amin Diagnostics Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Amin Diagnostics</h1>
            <p className="text-xs text-gray-500">Your Health, Our Priority</p>
          </div>
        </div>
        {/* Search Bar */}
        <div className="relative ml-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search patients, appointments..."
            className="pl-10 w-80 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
            3
          </span>
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-blue-600 capitalize font-medium">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer">
            <span className="text-sm font-medium text-white">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}