import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.delete('/:itemid', async (req, res) => {
    const { itemid } = req.params;
    try {
      const result = await pool.query('DELETE FROM items WHERE itemid = $1', [itemid]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
  });

//this is important if remove server won't run
export default router;