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

const deleteTableByName = async (req: Request, res: Response) => {
  const tableName = req.params.tableName;

  try {
    const query = `DROP TABLE ${tableName}`
    await pool.query(query);
    res.json({ message: `Table '${tableName}' deleted successfully` });
  } catch (err: any) {
    console.error(err);

    if (err.code === "42P01") {
      res.status(404).json({ error: `Table '${tableName}' does not exist` });
    } else if (err.code === "2BP01") {
      res.status(409).json({
        error: `Cannot delete table '${tableName}' because it has dependent objects`,
      });
    } else {
      res.status(500).json({ error: "Could not delete table" });
    }
  }
};
const deleteRecordById = async (req : Request, res: Response) => {
  const { tableName, id } = req.params;

  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    res.json({ message: `Record with id ${id} deleted from '${tableName}'` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete record" });
  }
}


const getTableSchema = async (req: Request, res: Response) => {
  const { tableName } = req.params
  try {
    const result = await pool.query(
      `SELECT column_name, data_type
       FROM information_schema.columns
       WHERE table_name = $1
       ORDER BY ordinal_position;`,
      [tableName]
    )

    res.json(result.rows) // e.g. [{ column_name: "name", data_type: "text" }, ...]
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Could not fetch schema" })
  }
}

const insertRecord = async (req: Request, res: Response) => {
  const tableName = req.params.tableName
  const data = req.body

  try {
    // Extract keys & values
    const keys = Object.keys(data)
    const values = Object.values(data)

    // Build parameterized query
    const cols = keys.map((k) => `"${k}"`).join(", ")
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")

    const query = `INSERT INTO "${tableName}" (${cols}) VALUES (${placeholders}) RETURNING *`

    const result = await pool.query(query, values)
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Could not insert record" })
  }
}

export { getTables, getTableDataByName, deleteTableByName, deleteRecordById, getTableSchema, insertRecord }