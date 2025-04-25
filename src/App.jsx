import { useState } from 'react'
import './App.css'
import StudentRegistration from './components/students/studentRegistration'
import NavBar from './components/navBar'
import StudentsTable from './components/students/studentsTable'
import ConfirmDelete from './components/confirmDelete'
import AddItems from './components/Items/addItems'
import ItemsTable from './components/Items/itemsTable'
import ItemPlacard from './components/Items/itemPlacard'
import Edit from './components/edit'

function App() {
  const [showStudentTable, setStudentTable] = useState(false);
  const [showItemsPlacar, setShowItemsPlacard] = useState(true);
  const [showItemsTable, setShowItemsTable] = useState(false);

  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const [showAddItems, setShowAddItems] = useState(false);  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [refreshStudents, setRefreshStudents] = useState(false);
  const [refereshItems, setRefreshItems] = useState(false);
  
  const [deleteId, setDeleteId] = useState({id: null, name: "", type: ""}); 
  const [editID , setEditID] = useState({id: null, name: "", type: "", img: "", stocks: ""});


  //we may pass tow values using this format, and also check your buttons like this to pass more values
  // <button onClick={() => showConfirmDelete(student.studentid, student.studentname)} 

  //so this is where we are going to fetch the data to confirmDelete jsx file so we can access it
  const handleDataConfig = (ID, NAME, TYPE, IMGNAME, STOCKS, METHOD) => {  //then use a useState
    
    if(METHOD === "delete"){
      setDeleteId({ id: ID, name: NAME, type: TYPE, img: IMGNAME}); //but its not done yet we need to pass it to the confirmDelete jsx file  
      setShowConfirmationModal(true);   //look below for reference for your future porject hahaha makakalimutin ako e
      
    } else if(METHOD === "edit"){
      setEditID({ id: ID, name: NAME, type: TYPE, img: IMGNAME, stocks: STOCKS});
      setShowAddItems(true);
    }
  };

  const handleCloseConfirmModal = (RefreshType) => {
    (RefreshType === "student") ? setRefreshStudents(prev => !prev) : setRefreshItems(prev => !prev);

    setShowConfirmationModal(false);
    setDeleteId(null);
  };

  return (
    <>
    <div>
      <NavBar       
                            // you may put two use state in one props by wrapping {} them and add ; at the end
          onToggleItemTable={() => {setStudentTable(false); setShowItemsTable(true); setShowItemsPlacard(false);}}
          onToggleStudentTable={() => {setStudentTable(true); setShowItemsTable(false); setShowItemsPlacard(false);}}
          onToggleItemPlacard={() => {setStudentTable(false); setShowItemsTable(false); setShowItemsPlacard(true);}}
        />
    </div>

      {/* ITEM PLACARD */}
      <div className='m-2 flex flex-wrap'>
        {showItemsPlacar && !showItemsTable && !showStudentTable && <ItemPlacard/>}
      </div>

      {/* STUDENT TABLE */}
      <div className='m-2 pt-10'>
          {showStudentTable && !showItemsTable && !showItemsPlacar && <StudentsTable 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)} 
            refreshSignal={refreshStudents} 

            //since showConfirmDelete throws the studentID, we need a function to get the data look above
            showConfirmDelete={handleDataConfig} 
          />}
      </div>

      {/* ITEM TABLE */}
      <div className='ml-5 mr-5'>
        {showItemsTable && !showStudentTable && !showItemsPlacar && <ItemsTable 
          onToogleAddItem={() => setShowAddItems(prev => !prev)}
          refreshSignal={refereshItems}
          showConfirmDelete={handleDataConfig}
          showEdit={handleDataConfig}
          />}
      </div>
    
      {/* This three modal needs to be on the bottom part they need to be on the top among all this UIs */}
      {/* ITEM MODAL */}
      {showAddItems && 
        <AddItems 
          onToggleShowAddItems={() => setShowAddItems(prev => !prev)}
          onToggleTableRefresh={() => setRefreshItems(prev => !prev)}
          showConfirmDelete={handleDataConfig}
          data={editID || ''}
      />}
   {/* STUDENT REGISTRAION MODAL */}
    {showStudentRegistration && (
        <div className='fixed z-50'>
          <StudentRegistration 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)}
            onToggleTableRefresh={() => setRefreshStudents(prev => !prev)} 
          />
        </div>
    )}

    {/* EDIT MODAL
    <div className='fixed z-50'>
        {showEdit && <Edit
          data={editID}
          onToggleEdit={() => setShowEdit(prev => !prev)}
        />}
    </div> */}
    
    {/* DELETE CONFIRMATION MODAL */}
    {showConfirmationModal && deleteId && (
        <div className='fixed'>
          <ConfirmDelete 
            data={deleteId}
            onToggleConfirmationModal={() => handleCloseConfirmModal(deleteId.type)}
            // the line of code above can be used like this {handleCloseConfirmModal}
            // if you are not passing a parameter to function
            // but if you are passing a variable in a function
            // then you must follow the code as it is the way kung paano mo cinode
            // hhaaha baka makalimutan ko e
          />                          
        </div>
    )}

    </>
  );
}

export default App;
