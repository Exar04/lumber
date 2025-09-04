// Insert student

import { Router, Request, Response } from 'express';
import pool from '../config/db.js';

const app = Router();

app.post("/get", async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query Failed" });
  }
});

export default app