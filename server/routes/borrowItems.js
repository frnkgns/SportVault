import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { studentid, itemid, quantity, allow } = req.body;

  if (!studentid || !itemid || !quantity || allow == undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {

    //verify if the student borrowed an item before
    const check = await pool.query(
      `SELECT student.studentname, items.itemname, borrow_history.quantity
       FROM student
       INNER JOIN borrow_history ON student.studentid = borrow_history.studentid
       INNER JOIN items ON items.itemid = borrow_history.itemid
       WHERE student.studentid = $1`,
      [studentid]
    );

    // then if exist we will ask the admin if it will be approved or not
    if(check.rowCount > 0 ) {
      if(!allow) {                                            //then lets check if the admin allowed the student to borrow another item
        return res.status(200).json({                         //if not we will return this message and the data
          message: 'Student has already borrowed an item' ,
          data: check.rows                            // this is the data that we will pass to the modal  
        });
      } else { 
        AllowBorrow();
        return res.status(201).json({ message: 'Borrow Approved' }); //if the admin allowed the student to borrow another item we will just return this message
      }

    } else {                                                //if the student has not borrowed an item before we will just allow the student to borrow an item
      AllowBorrow();
    }    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong', details: err.message });
  }

  // you need to declare async to use the function inside the main function
  async function AllowBorrow() {

    try{
      // lets check first if the student already borrowed the item before
      const checkItem = await pool.query(
        'SELECT * FROM borrow_history WHERE studentid = $1 AND itemid = $2',
        [studentid, itemid]
      );

      //if the student already borrowed the item before we will just update the quantity of the item
      // else we will insert the item to the borrow history
      checkItem.rowCount > 0 ?
        await pool.query('UPDATE borrow_history SET quantity = quantity + $1 WHERE studentid = $2 AND itemid = $3',
          [quantity, studentid, itemid]) : 
        await pool.query('INSERT INTO borrow_history (studentid, itemid, quantity) VALUES ($1, $2, $3)',
          [studentid, itemid, quantity]);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
  }
});



export default router;
