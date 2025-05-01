import axios from "axios";
import { useState, useEffect } from "react";

function StudentRegistration({onToggleStudentReg, onToggleTableRefresh, data, messageModal}){

    // i think react used useState as a variable so we don't do traditional variable here
    const [studentData, setStudentData] = useState({oldId: '', studentid: '', name: '', course: '', section: ''});   

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const response = await axios.post('http://localhost:5000/student', studentData);   //pass the data
          
          //check if the status is success which is 200
          if (response.status === 200) {    //if success then reset the data
            setStudentData({oldId:'', studentid: '', name: '', course: '', section: ''})
            onToggleTableRefresh();
            messageModal("Student Registration Complete!", "success");

            console.log("Student Registered Sucessfully");
          }

      } catch (err) {
        const errorMsg = err.response?.data?.error || "Something went wrong while registering.";
        messageModal(`Something went wrong: ${errorMsg}`, "error");
        console.error("Registration error:", errorMsg);      }
    };

    // to edit specific variable inside the data you must use this format
    // setStudentData({...data, itemyouwantoedithere})
    // view the example below

    useEffect(() => {
        if (data) {
            switch (data.method) {
                case "edit":
                    setStudentData({oldId: data.id, studentid: data.id, name: data.name, course: data.course, section: data.section })
                    break;
                
                default:    //default if the case is "new"
                    setStudentData({oldId: '', studentid: '', name: '', course: '', section: ''})
                    break;
            }
        }

        console.log("Edit Student", data);

    }, [data]);
    

    return (
        <div className="items-center h-screen w-screen justify-center flex flex-col top-0 inset-0 z-50 fixed drop-shadow-white drop-shadow-xl/50">
            <div className=" bg-gray-900 h-fit p-10 rounded-lg flex w-fit flex-col text-white">
                <div className="flex">
                    <p className="flex text-3xl mb-5 font-semibold"> { studentData.studentid !== '' ? 'Edit Student Data' : 'Student Registration Form' } </p>
                    <button onClick={onToggleStudentReg} className="rounded-lg translate-x-10 -translate-y-10 text-white hover:text-red-500">X</button>
                </div>

                <div className="text-xl">
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Student ID</label>
                        <input value={studentData.studentid} onChange={(e) => setStudentData({...studentData, studentid: e.target.value})}
                        type="text" id="studentID" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21-11345" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Student Name</label>
                        <input value={studentData.name} onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                        type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jacob Michael P. Segundo" required />
                    </div>
                    <div className="mb-5 flex gap-5">
                        <div>
                            <label className="block mb-2  font-medium text-gray-900 dark:text-white">Course</label>
                            <input value={studentData.course} onChange={(e) => setStudentData({...studentData, course: e.target.value})}
                            type="text" id="course" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BSCS" required /> 
                        </div>
                        
                        <div>
                            <label className="block mb-2  font-medium text-gray-900 dark:text-white">Year & Field</label>
                            <input value={studentData.section} onChange={(e) => setStudentData({...studentData, section: e.target.value})}
                            type="text" id="section" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4A DM" required />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default StudentRegistration;