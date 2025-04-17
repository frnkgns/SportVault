import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
    
    try {
      // Execute the query
      const data = await pool.query('SELECT * FROM items');
  
      const itemsWithBase64Images = data.rows.map(item => {
        if (item.image) {
          // Convert bytea buffer to base64 string so we could used it
          item.image = `data:image/jpeg;base64,${item.image.toString("base64")}`;
        }
        return item;
      });
  
      res.json(itemsWithBase64Images);
    } catch (err) {
        res.status(500).json({error: 'Database Error', details:err.message});
    }
  });
  
export default router;