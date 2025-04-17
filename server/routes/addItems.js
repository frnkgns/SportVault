import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { itemID, itemName, itemStocks, itemImage  } = req.body; // Accessing data sent from frontend
  
    console.log('Received:', itemID, itemName, itemStocks, itemImage);
  
    // Construct the SQL query to insert data into table
    const query = `
      INSERT INTO items (itemid, itemname, stocks, image)
      VALUES ($1, $2, $3, $4)
    `;
  
    try {
      // Execute the query
      await pool.query(query, [itemID, itemName, itemStocks, itemImage ]);
  
      // Respond back after successful insertion
      res.json({ message: 'Item listed successfully!', itemID, itemName, itemStocks, itemImage  });
    } catch (err) {
    
        res.status(500).json({ error: 'Database error', details: err.message });
      console.error('Error inserting data:', err);
    }
  });
  
export default router;