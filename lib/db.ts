import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:schools.db'
});

export async function initializeDatabase() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact TEXT NOT NULL,
        image TEXT,
        email_id TEXT UNIQUE NOT NULL
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export { client };