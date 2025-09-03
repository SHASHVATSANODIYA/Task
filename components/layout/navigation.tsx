'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Eye } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/addSchool', label: 'Add School', icon: Plus },
    { href: '/showSchools', label: 'View Schools', icon: Eye },
  ];

  return (
    <div className="flex justify-center mb-8">
      <nav className="flex space-x-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}