'use client';

import { School } from '@/lib/types/school';
import { MapPin, Phone, Mail, School as SchoolIcon } from 'lucide-react';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        {school.image ? (
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <SchoolIcon className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {school.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-gray-600">
            <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-gray-400" />
            <span className="text-sm">
              {school.address}, {school.city}, {school.state}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">{school.contact}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm break-all">{school.email_id}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            ID: {school.id}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}