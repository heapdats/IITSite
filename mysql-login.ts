import mysql from 'mysql2/promise';

export async function testConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_NAME || 'my_website_db',
  });

  // Simple test query
  const [rows] = await connection.execute('SELECT NOW() AS now');
  await connection.end();

  return rows;
}

// Immediately call and log the result when running this file directly
(async () => {
  try {
    const result = await testConnection();
    console.log('Database connection successful. Query result:', result);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
