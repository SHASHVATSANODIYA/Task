import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/lib/constants';

export const schoolSchema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGES.required),
  address: z.string().min(1, VALIDATION_MESSAGES.required),
  city: z.string().min(1, VALIDATION_MESSAGES.required),
  state: z.string().min(1, VALIDATION_MESSAGES.required),
  contact: z.string()
    .regex(/^\d{10}$/, VALIDATION_MESSAGES.contact)
    .min(10, VALIDATION_MESSAGES.contact)
    .max(10, VALIDATION_MESSAGES.contact),
  email_id: z.string()
    .email(VALIDATION_MESSAGES.email)
    .min(1, VALIDATION_MESSAGES.required),
  image: z.any().optional()
});

export type SchoolFormData = z.infer<typeof schoolSchema>;