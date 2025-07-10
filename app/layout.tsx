'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <html lang="en">
      <head>
        <title>Amin Diagnostics and Medical Services</title>
        <meta
          name="description"
          content="Comprehensive healthcare management system"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
