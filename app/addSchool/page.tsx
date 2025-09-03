'use client';

import { School } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Navigation } from '@/components/layout/navigation';
import { SchoolForm } from '@/components/forms/school-form';

export default function AddSchool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PageHeader 
            title="School Management" 
            description="Add a new school to the directory"
            icon={School}
          />
          
          <Navigation />
          
          <SchoolForm />
        </div>
      </div>
    </div>
  );
}