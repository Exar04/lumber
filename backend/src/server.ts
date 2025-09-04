import dotenv from 'dotenv';
import app from './app.js';
import { initDb } from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

(async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();