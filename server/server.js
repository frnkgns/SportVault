import express from "express";
import cors from "cors";
import studentRegRoute from './routes/studentReg.js'
import getAllStudent from './routes/getAllStudent.js'
import removeStudent from './routes/removeStudent.js'
import AddItems from "./routes/addItems.js";
import getAllItems from './routes/getAllItems.js';
import removeItem from './routes/removeItems.js'

//Note server wont run unless you go to the server fodler
//cd server

const app = express();
app.use(cors());
app.use(express.json());  //this is for enabling json data para ma access natin yung data sa json

//Routes
app.use('/student', studentRegRoute);
app.use('/allstudents', getAllStudent);
app.use('/student', removeStudent);
app.use('/items', AddItems);
app.use('/allitems', getAllItems);
app.use('/items', removeItem);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
