import { useState } from 'react'
import './App.css'
import StudentRegistration from './components/students/studentRegistration'
import NavBar from './components/navBar'
import StudentsTable from './components/students/studentsTable'
import ConfirmDelete from './components/confirmDelete'
import AddItems from './components/Items/addItems'
import ItemsTable from './components/Items/itemsTable'
import ItemPlacard from './components/Items/itemPlacard'

function App() {
  const [showTables, setShowTable] = useState({student: false, items: false, placard: true});
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [refreshState, setRefreshState] = useState({ students: false, items: false });
  
  const [deleteId, setDeleteId] = useState({id: null, name: "", type: ""}); 
  const [editID , setEditID] = useState({id: null, name: "", type: "", img: "", stocks: "", section: "", course: ""});

  //we may pass tow values using this format, and also check your buttons like this to pass more values
  // <button onClick={() => showConfirmDelete(student.studentid, student.studentname)} 

  //now this variable was called to hold the data that was passed from the table
  //following the parameters of the this variable, the parameters format should be the same as how we will pass the 
  //data from the table
  const handleDataConfig = (ID, NAME, TYPE, IMGNAME, STOCKS, METHOD, SECTION, COURSE) => {  //then use a useState
    switch(METHOD){
      case "delete":
        setDeleteId({ id: ID, name: NAME, type: TYPE, img: IMGNAME})
        setShowConfirmationModal(true);  
        break;

        case "edit":  //if button EDIT click then we need to pass the data
          setEditID({ id: ID, name: NAME, type: TYPE, img: IMGNAME, stocks: STOCKS , method: METHOD, section: SECTION, course: COURSE});

          TYPE == "student" ? 
          setShowAddStudentModal(true) :
          setShowAddItemModal(true);
          console.log(editID);    
          break;
        
        case "new": //if button NEW click then we don't need to pass the data
          if(TYPE == "student"){
          setEditID({id: '', name: '', type: '', img: '', method: '', section: '', course: ''});
          } else {
            setEditID({ id: '', name: '', type: '', img: '', stocks: '', method: METHOD });
          }
          break;

        case "newstudent":
          setEditID({id: '', name: '', type: '', img: '', method: '', section: '', course: ''});
          break;
        
        default:
          break;
    }
  };

  const handleCloseConfirmModal = (RefreshType) => {
    if (RefreshType === "student") {
      setRefreshState(prev => ({ ...prev, students: !prev.students }));
    } else {
      setRefreshState(prev => ({ ...prev, items: !prev.items }));
    }

    setShowConfirmationModal(false);
    setDeleteId({ id: null, name: "", type: "" });
  };

  return (
    <>
    <div>
      <NavBar       
          // you may put two use state in one props by wrapping {} them and add ; at the end
        onToggleItemTable={() => {
          setShowTable({ student: false, items: true, placard: false });
        }}
        onToggleStudentTable={() => {
          setShowTable({ student: true, items: false, placard: false });
        }}
        onToggleItemPlacard={() => {
          setShowTable({ student: false, items: false, placard: true });
        }}
        />
    </div>

      {/* ITEM PLACARD */}
      <div className='m-2 flex flex-wrap'>
        {showTables.placard && <ItemPlacard/>}
      </div>

      {/* STUDENT TABLE */}
      <div className='m-2 pt-10'>
          {showTables.student && <StudentsTable 
            showConfirmDelete={handleDataConfig} 
            dataConfig={handleDataConfig}
            onToggleStudentReg={() => setShowAddStudentModal(true)} 
            refreshSignal={refreshState.students} 
          />}
      </div>

      {/* ITEM TABLE */}
      <div className='ml-5 mr-5'>
        {showTables.items && <ItemsTable 
        dataConfig={handleDataConfig}
          onToogleAddItem={() => setShowAddItemModal(true)}
          refreshSignal={refreshState.items}
          showConfirmDelete={handleDataConfig}
          />}
      </div>
    
      {/* This three modal needs to be on the bottom part they need to be on the top among all this UIs */}
      {/* ITEM MODAL */}
      {showAddItemModal && showTables.items && 
        <AddItems 
          onToggleShowAddItems={() => setShowAddItemModal(false)}
          onToggleTableRefresh={() => setRefreshState(prev => ({ ...prev, items: !prev.items }))}
          showConfirmDelete={handleDataConfig}
          data={editID}
        />
      }

   {/* STUDENT REGISTRAION MODAL */}
    {showAddStudentModal && (
        <div className='fixed z-50'>
          <StudentRegistration 
            onToggleStudentReg={() => setShowAddStudentModal(false)}
            onToggleTableRefresh={() => setRefreshState(prev => ({ ...prev, students: !prev.students }))} 
            data={editID}
          />
        </div>
    )}

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
