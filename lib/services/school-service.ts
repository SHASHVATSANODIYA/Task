import { client } from '@/lib/db';
import { School } from '@/lib/types/school';

export class SchoolService {
  static async createSchool(schoolData: Omit<School, 'id'>): Promise<{ id: number }> {
    const result = await client.execute({
      sql: `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        schoolData.name,
        schoolData.address,
        schoolData.city,
        schoolData.state,
        schoolData.contact,
        schoolData.image,
        schoolData.email_id
      ]
    });

    return { id: Number(result.lastInsertRowid) };
  }

  static async getAllSchools(): Promise<School[]> {
    const result = await client.execute('SELECT * FROM schools ORDER BY id DESC');
    
    return result.rows.map(row => ({
      id: Number(row.id),
      name: String(row.name),
      address: String(row.address),
      city: String(row.city),
      state: String(row.state),
      contact: String(row.contact),
      image: String(row.image),
      email_id: String(row.email_id)
    }));
  }

  static async getSchoolById(id: number): Promise<School | null> {
    const result = await client.execute({
      sql: 'SELECT * FROM schools WHERE id = ?',
      args: [id]
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: Number(row.id),
      name: String(row.name),
      address: String(row.address),
      city: String(row.city),
      state: String(row.state),
      contact: String(row.contact),
      image: String(row.image),
      email_id: String(row.email_id)
    };
  }
}