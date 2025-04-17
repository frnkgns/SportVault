import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
    
    try {
      // Execute the query
      const data = await pool.query('SELECT * FROM student');
  
      // Respond back after successful insertion
      res.json(data.rows);
    } catch (err) {
        res.status(500).json({error: 'Database Error', details:err.message});
    }
  });
  
export default router;