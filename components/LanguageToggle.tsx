'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const pathname = usePathname();
  const isBengali = pathname.startsWith('/bn');
  const otherPath = isBengali ? pathname.replace('/bn', '') || '/' : `/bn${pathname}`;
  return (
    <div className="flex gap-2 text-sm">
      <Link href={isBengali ? otherPath : pathname} className={isBengali ? 'underline' : ''}>EN</Link>
      <span>|</span>
      <Link href={isBengali ? pathname : otherPath} className={isBengali ? '' : 'underline'}>BN</Link>
    </div>
  );
}
