import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.delete('/:studentid', async (req, res) => {
    const { studentid } = req.params;
    try {
      const result = await pool.query('DELETE FROM student WHERE studentid = $1', [studentid]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
  });

//this is important if remove server won't run
export default router;