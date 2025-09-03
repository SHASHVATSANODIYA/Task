'use client';

import Link from 'next/link';
import { School, Plus } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No schools found</h3>
      <p className="text-gray-500 mb-4">Start by adding your first school to the directory</p>
      <Link 
        href="/addSchool" 
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add First School
      </Link>
    </div>
  );
}