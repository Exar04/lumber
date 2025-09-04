import { Router } from 'express';
import { getTableDataByName, getTables } from '../controllers/tableController.js';

const router = Router();

router.get('/', getTables);
router.get('/:tableName', getTableDataByName);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Table route is working' });
})

export default router;