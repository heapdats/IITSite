import mysql from 'mysql2/promise';

async function connectToDatabase() {
  const config = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL!');
    await connection.end();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

connectToDatabase();
