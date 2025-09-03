'use client';

import { School } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Navigation } from '@/components/layout/navigation';
import { SchoolCard } from '@/components/school/school-card';
import { SchoolStats } from '@/components/school/school-stats';
import { EmptyState } from '@/components/school/empty-state';
import { useSchools } from '@/hooks/school/use-schools';

export default function ShowSchools() {
  const { schools, loading, error } = useSchools();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="School Directory" 
            description="Discover schools in your area"
            icon={School}
          />
          
          <Navigation />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {schools.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <SchoolStats totalSchools={schools.length} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}