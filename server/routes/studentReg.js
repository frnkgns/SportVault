import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { oldId, studentid, name, course, section } = req.body; // Accessing data sent from frontend
  
    console.log('Received:', oldId, studentid, name, course, section);
    

    try{
      if(oldId === undefined || oldId === '' || oldId === null){
        InsertNewRecord();
      } else {
        EditRecord()      
      }
      
    } catch(err){
      console.log(err)
    }

    async function EditRecord(){
      try{
        const updateinsertQuery = `
          UPDATE student SET studentid = $1, studentname = $2, course = $3, section = $4 WHERE studentid = $5
        `;
        await pool.query(updateinsertQuery, [studentid, name, course, section, oldId]);
        res.json({message: 'Student Data Edited Successfully'})

      } catch(err){
        return res.status(500).json({ error: 'Cannot Edit Student Data | Some thing went wrong', details: err.message });
      }
    }

    async function InsertNewRecord(){
      try {
          // Construct the SQL query to insert data into table
          const insertQuery = `
            INSERT INTO student (studentid, studentname, course, section)
            VALUES ($1, $2, $3, $4)
          `;
          await pool.query(insertQuery, [studentid, name, course, section]);
          res.json({ message: 'Student registered successfully!', studentid, name, course, section });        // Respond back after successful insertion

      } catch (err) {
  
        console.error('Error inserting data:', err);
  
        if (err.code === '23505') {
          return res.status(400).json({ error: 'Student ID already exists. Please use a unique ID.' });
        }
  
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
    }
  });
  
export default router;