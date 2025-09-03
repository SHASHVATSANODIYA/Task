'use client';

interface SchoolStatsProps {
  totalSchools: number;
}

export function SchoolStats({ totalSchools }: SchoolStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {totalSchools} {totalSchools === 1 ? 'School' : 'Schools'} Registered
        </h2>
        <p className="text-gray-600">Building the future of education</p>
      </div>
    </div>
  );
}