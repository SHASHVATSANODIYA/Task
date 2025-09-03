'use client';

import { useState, useEffect } from 'react';
import { School } from '@/lib/types/school';

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data.schools);
        setError('');
      } else {
        setError('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      setError('Failed to fetch schools');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const refetch = () => {
    fetchSchools();
  };

  return {
    schools,
    loading,
    error,
    refetch
  };
}