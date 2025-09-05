import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER || "myuser",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "mydb",
  password: process.env.PGPASSWORD || "mypassword",
  port: Number(process.env.PGPORT) || 5432,
});


export async function initDb() {
  try {
    // create students
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `);

    // create courses
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT
      );
    `);

    // create join table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_courses (
        student_id INT REFERENCES students(id) ON DELETE CASCADE,
        course_id INT REFERENCES courses(id) ON DELETE CASCADE,
        PRIMARY KEY (student_id, course_id)
      );
    `);

    // create teachers 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(100) NOT NULL,
        qualification VARCHAR(100) NOT NULL
      );
    `);

    console.log("✅ Tables created (if not exists)");
  } catch (err) {
    console.error("❌ Error creating tables", err);
  }
}

export default pool;
