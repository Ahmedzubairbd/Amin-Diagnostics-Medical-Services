'use client'
import LanguageToggle from '@/components/LanguageToggle'

export default function AboutUsBn() {
  return (
    <div className="p-8 space-y-4">
      <LanguageToggle />
      <h1 className="text-2xl font-bold">আমাদের সম্পর্কে</h1>
      <p>এই পৃষ্ঠা বাংলায় অনুবাদের অধীন।</p>
    </div>
  );
}
