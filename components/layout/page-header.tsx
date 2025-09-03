'use client';

import { DivideIcon as LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Icon className="h-12 w-12 text-blue-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
}