import express from "express";
import cors from "cors";
import studentRegRoute from './routes/studentReg.js'
import getAllStudent from './routes/getAllStudent.js'
import removeStudent from './routes/removeStudent.js'
import AddItems from "./routes/addItems.js"
import getAllItems from './routes/getAllItems.js'
import removeItem from './routes/removeItems.js'
import uploadImageRoute from './routes/saveImageToFolder.js'
import imageRoutes from './routes/removeImage.js'
import borrowItem from './routes/borrowItems.js'

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
app.use('/borrowItem', borrowItem); // Borrow item route

app.use('/images', uploadImageRoute);
app.use('/images', express.static('images')); // so frontend can access the files

app.use("/images", imageRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
