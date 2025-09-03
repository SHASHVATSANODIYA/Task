'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolSchema, type SchoolFormData } from '@/lib/validations/school';
import { FormField, Input, Textarea } from '@/components/ui/form-field';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface SchoolFormProps {
  onSuccess?: () => void;
}

export function SchoolForm({ onSuccess }: SchoolFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema)
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else if (key !== 'image') {
          formData.append(key, value as string);
        }
      });

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setImagePreview('');
        onSuccess?.();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-800">School added successfully!</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">Failed to add school. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="School Name" error={errors.name?.message} required>
            <Input
              {...register('name')}
              placeholder="Enter school name"
              error={!!errors.name}
            />
          </FormField>

          <FormField label="Email Address" error={errors.email_id?.message} required>
            <Input
              {...register('email_id')}
              type="email"
              placeholder="school@example.com"
              error={!!errors.email_id}
            />
          </FormField>
        </div>

        <FormField label="Address" error={errors.address?.message} required>
          <Textarea
            {...register('address')}
            placeholder="Enter complete address"
            error={!!errors.address}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="City" error={errors.city?.message} required>
            <Input
              {...register('city')}
              placeholder="Enter city"
              error={!!errors.city}
            />
          </FormField>

          <FormField label="State" error={errors.state?.message} required>
            <Input
              {...register('state')}
              placeholder="Enter state"
              error={!!errors.state}
            />
          </FormField>
        </div>

        <FormField label="Contact Number" error={errors.contact?.message} required>
          <Input
            {...register('contact')}
            placeholder="Enter 10-digit contact number"
            maxLength={10}
            error={!!errors.contact}
          />
        </FormField>

        <FormField label="School Image" error={errors.image?.message}>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> school image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}
          </div>
        </FormField>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Adding School...' : 'Add School'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              reset();
              setImagePreview('');
            }}
            className="flex-1 sm:flex-none bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}