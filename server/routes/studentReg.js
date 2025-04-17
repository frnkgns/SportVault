import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { studentID, name, course, section } = req.body; // Accessing data sent from frontend
  
    console.log('Received:', studentID, name, course, section);
  
    // Construct the SQL query to insert data into table
    const query = `
      INSERT INTO student (studentid, studentname, course, section)
      VALUES ($1, $2, $3, $4)
    `;
  
    try {
      // Execute the query
      await pool.query(query, [studentID, name, course, section]);
  
      // Respond back after successful insertion
      res.json({ message: 'Student registered successfully!', studentID, name, course, section });
    } catch (err) {

      (err.code === '23505') ? res.status(400).json({ error: 'Student ID already exists. Please use a unique ID.' }) 
                            : res.status(500).json({ error: 'Database error', details: err.message });
      console.error('Error inserting data:', err);
    }
  });
  
export default router;