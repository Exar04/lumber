// Insert student

import { Router, Request, Response } from 'express';
import pool from '../config/db.js';

const app = Router();
app.post("/add-student", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Insert course
app.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add course" });
  }
});

// Enroll student into a course
app.post("/enroll", async (req: Request, res: Response) => {
  const { student_id, course_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [student_id, course_id]
    );
    res.json({ message: "Student enrolled into course!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enroll student" });
  }
});

export default app