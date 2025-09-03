export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';
import { schoolSchema } from '@/lib/validations/school';
import { z } from 'zod';
import { SchoolService } from '@/lib/services/school-service';
import { saveImage } from '@/utils/image-upload';

// Initialize database on startup
initializeDatabase();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const schoolData = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      contact: formData.get('contact') as string,
      email_id: formData.get('email_id') as string,
    };

    // Validate the data
    const validatedData = schoolSchema.parse({
      ...schoolData,
      image: formData.get('image')
    });

    const imageFile = formData.get('image') as File;
    const imagePath = await saveImage(imageFile);

    // Insert into database
    const result = await SchoolService.createSchool({
      name: validatedData.name,
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      contact: validatedData.contact,
      image: imagePath,
      email_id: validatedData.email_id
    });

    return NextResponse.json(
      { message: 'School added successfully', id: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding school:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
  { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const schools = await SchoolService.getAllSchools();
    
    return NextResponse.json({
      schools
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}