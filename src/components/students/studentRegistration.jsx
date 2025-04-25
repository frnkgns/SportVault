import axios from "axios";
import { useState } from "react";

function StudentRegistration({onToggleStudentReg, onToggleTableRefresh}){

    // i think react used useState as a variable so we don't do traditional variable here
    const [studentID, setStudentID] = useState('');
    const [course, setCourse] = useState('');
    const [section, setSection] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSuccessMessage("");    //set it by empty string
      setErrorMessage("");

      try{
        const response = await axios.post('http://localhost:5000/student',
            { studentID, name, course, section },
          );
          
        //   console.log('Server response:', data);
    
          //then kapag ok yung query fetcth message
          if (response.status === 200) {
            setSuccessMessage(response.data.message);
            setStudentID("");
            setName("");
            setCourse("");
            setSection("");
    
            onToggleTableRefresh();
          } else {
            setErrorMessage(response?.data?.error || "Something went wrong.");
          }
      } catch (err) {
        const errorMsg = err.response?.data?.error || "Something went wrong while registering.";
        setErrorMessage(errorMsg);
        console.error("Registration error:", errorMsg);      }
    };

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col top-0 inset-0 z-50 fixed drop-shadow-white drop-shadow-xl/50">
            <div className=" bg-gray-900 h-fit p-10 rounded-lg flex w-fit flex-col text-white">
                <div className="flex">
                    <p className="flex text-3xl mb-5 font-semibold">Student Registration Form</p>
                    <button onClick={onToggleStudentReg} className="rounded-lg translate-x-10 -translate-y-10 text-red-500">X</button>
                </div>

                <div className="text-xl">
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Student ID</label>
                        <input value={studentID} onChange={(e) => setStudentID(e.target.value)}
                        type="text" id="studentID" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21-11345" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Student Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                        type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jacob Michael P. Segundo" required />
                    </div>
                    <div className="mb-5 flex gap-5">
                        <div>
                            <label className="block mb-2  font-medium text-gray-900 dark:text-white">Course</label>
                            <input value={course} onChange={(e) => setCourse(e.target.value)}
                            type="text" id="course" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BSCS" required /> 
                        </div>
                        
                        <div>
                            <label className="block mb-2  font-medium text-gray-900 dark:text-white">Year & Field</label>
                            <input value={section} onChange={(e) => setSection(e.target.value)}
                            type="text" id="section" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4A DM" required />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>

            {/* Success Message if record was saved */}
            {successMessage && (
                <div className="flex items-center mt-10 p-4 mb-4  text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Success!</span> {successMessage}
                    </div>
                </div>
            )}

            {/* Error Message if registration fails*/}
            {errorMessage && (
                <div className="flex items-center p-4 mt-10 mb-4  text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                    <span className="font-medium">Oops!</span> {errorMessage}
                    </div>
              </div>
            )}            
        </div>
    );
}



export default StudentRegistration;