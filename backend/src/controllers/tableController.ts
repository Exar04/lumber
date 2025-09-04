import { Request, Response} from "express"
import pool from "../config/db.js";
const getTables = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `);
        res.json(result.rows.map(r => r.table_name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch tables" });
    }
};


const getTableDataByName = async (req: Request, res: Response) => {
    const tableName = req.params.tableName;
    try {
        const result = await pool.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch table data" });
    }
}
export { getTables, getTableDataByName }