import { Router } from 'express';
import { deleteRecordById, deleteTableByName, getTableDataByName, getTables, getTableSchema, insertRecord } from '../controllers/tableController.js';

const router = Router();

router.get('/', getTables);
router.get('/:tableName', getTableDataByName);
router.get('/:tableName/schema', getTableSchema);
router.post('/:tableName', insertRecord);
router.delete('/:tableName', deleteTableByName);
router.delete('/:tableName/:id', deleteRecordById);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Table route is working' });
})

export default router;