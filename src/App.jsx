import { useState } from 'react'
import './App.css'
import StudentRegistration from './components/studentRegistration'
import NavBar from './components/navBar'
import StudentsTable from './components/studentsTable'
import ConfirmDelete from './components/confirmDelete'
import AddItems from './components/addItems'
import ItemsTable from './components/itemsTable'

function App() {
  const [showStudentTable, setStudentTable] = useState(false);

  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const [showAddItems, setShowAddItems] = useState(false);  
  const [refreshStudents, setRefreshStudents] = useState(false);
  const [refereshItems, setRefreshItems] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState({id: null, name: "", type: ""}); 
  //we may pass tow values using this format, and also check your buttons like this to pass more values
  // <button onClick={() => showConfirmDelete(student.studentid, student.studentname)} 

  //so this is where we are going to fetch the data to confirmDelete jsx file so we can access it
  const handleRemoveData = (ID, NAME, TYPE, IMGNAME) => {  //then use a useState
    setDeleteId({ id: ID, name: NAME, type: TYPE, img: IMGNAME}); //but its not done yet we need to pass it to the confirmDelete jsx file
    setShowConfirmationModal(true);                           //look below for reference for your future porject hahaha makakalimutin ako e
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmationModal(false);
    setDeleteId(null);
    setRefreshStudents(prev => !prev); // this will refresh the table
    setRefreshItems(prev => !prev);
  };

  const handleCloseAddItem = () => {
    setRefreshItems(prev => !prev); 
    setShowAddItems(false);
  };

  return (
    <>
    {/* NAVBAR */}
      <div className='bg-white'>
        <NavBar
          onToggleItemTable={() => setStudentTable(false)}
          onToggleStudentTable={() => setStudentTable(true)}
        />

    {/* STUDENT TABLE */}
        <div className='m-5'>
          {showStudentTable && <StudentsTable 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)} 
            refreshSignal={refreshStudents} 

            //since showConfirmDelete throws the studentID, we need a function to get the data look above
            showConfirmDelete={handleRemoveData} 

          />}
        </div>
      </div>

    {/* ITEMS TABLE */}
      {showAddItems && 
        <AddItems 
          onToggleShowAddItems={() => setShowAddItems(prev => !prev)}
          onToggleTableRefresh={() => setRefreshItems(prev => !prev)}
          showConfirmDelete={handleRemoveData}
          />}
      
      <div className='m-5'>
        {!showStudentTable && <ItemsTable 
          onToogleAddItem={() => setShowAddItems(prev => !prev)}
          refreshSignal={refereshItems}
          showConfirmDelete={handleRemoveData}
          />}
      </div>
      

    {/* This two modal needs to be on the bottom part they need to be on the top among all this UIs */}

    {/* STUDENT REGISTRATION MODAL */}
      {showStudentRegistration && (
        <div className='fixed'>
          <StudentRegistration 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)}
            onToggleTableRefresh={handleCloseAddItem} 
          />
        </div>
      )}

    {/* CONFIRMATION DELETE MODAL */}
      {showConfirmationModal && deleteId && (
        <div className='fixed'>
          <ConfirmDelete 
            id={deleteId.id}   //so ito yung way para ipasa yung data but first you need to initialize the code above 
            name={deleteId.name}  
            type={deleteId.type} //so ito yung way para ipasa yung data but first you need to initialize the code above 
            img={deleteId.img}
            onToggleConfirmationModal={handleCloseConfirmModal} //yang studentid is yung parameter from another jsx file or tinataawag na props here sa react
          />
        </div>
      )}

    </>
  );
}

export default App;
