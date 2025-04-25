import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const {itemid, itemName, itemStocks, itemImage  } = req.body; // Accessing data sent from frontend
  
    console.log('Received:', itemid, itemName, itemStocks, itemImage);

    // if(itemid){
    //   const updateId = `
    //     UPDATE items SET itemname = $1, stocks = $2, image = $3 WHERE itemid = $4
    //     `;
    // }

    const checkId = `
      SELECT * FROM items where itemid = $1
    `;

    try{

      let IdExist = true;

      do{
        //we will be assigning a 4 digit random id on every item added in the inventory
        //to do so we need to get the Math.random() * 9000 + 1000
        //1000 will guarantee 4 digit number but without it we may get 1-2-3-4 digit 
        //we need it fix 4 digit
        let RandomID = Math.floor(Math.random() * 9000) + 1000;
        let data = await pool.query(checkId, [RandomID]);

        if(data.rowCount === 0){
          // Construct the SQL query to insert data into table
            const query = `
            INSERT INTO items (itemid, itemname, stocks, image)
            VALUES ($1, $2, $3, $4)
          `;
  
          try {
            // Execute the query
            await pool.query(query, [RandomID, itemName, itemStocks, itemImage ]);
  
            // Respond back after successful insertion
            res.json({ message: 'Item listed successfully!', RandomID, itemName, itemStocks, itemImage  });
            IdExist = false


          } catch (err) {
            return res.status(500).json({ error: 'Insert failed', details: err.message });
            // console.error('Error inserting data:', err);
          }

        } else {
          IdExist = true;
        }

      } while(IdExist)

    } catch (err){
      res.status(500).json({ error: 'Database error', details: err.message });
      console.error('Error inserting data:', err);
    }
  
    
  });

export default router;