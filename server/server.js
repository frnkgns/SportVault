import express from "express";
import cors from "cors";
import studentRegRoute from './routes/studentReg.js'
import getAllStudent from './routes/getAllStudent.js'
import removeStudent from './routes/removeStudent.js'
import AddItems from "./routes/addItems.js";

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


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
