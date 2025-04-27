import axios from "axios";
import { useEffect, useState } from "react";
import OperationMessage from "../operationMessage";

//instead calling this as parameter call it as props
function StudentsTable({refreshSignal, showConfirmDelete, onToggleStudentReg, dataConfig}) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios("http://localhost:5000/allstudents");
                setStudents(response.data);
                
            } catch (error) {
                console.error("Failed to fetch students:", error);
            }
        };

        fetchStudents();

        //using the props to enable the refetch
    }, [refreshSignal]);

    const handleNewStudentClick = () => {
        dataConfig('', '', "student", '', '', "newstudent", '', '')
        onToggleStudentReg();
    };

    const handleDataPass = (type, student) => {
        console.log("Student Data Config: : ", type);
        console.log(type, ": ", student.studentid);
        switch(type){
            case "edit":
                dataConfig(student.studentid, student.studentname, "student", "", "", "edit", student.course, student.section)
                console.log("Editing Student: ", student.studentid)
                break;

            case "delete":
                showConfirmDelete(student.studentid, student.studentname, "student", "", "","delete", student.course, student.section)
                console.log("Deleting Student: ", student.studentid)
                break;            
            }
    }
    
    return (
        <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[35em] -mt-8">
            <table className="w-full text-left text-white">
                <thead className="text-base uppercase bg-gray-50 dark:bg-gray-700 text-white sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Student ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Course</th>
                        <th className="px-6 py-3">Section</th>
                        <th className="px-6 py-3 justify-end flex">
                            <button onClick={handleNewStudentClick}
                            className="ml-5  bg-blue-700 border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-300 hover:border-blue-200 hover:text-black">REGISTER</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentid} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{student.studentid}</td>
                            <td className="px-6 py-4">{student.studentname}</td>
                            <td className="px-6 py-4">{student.course}</td>
                            <td className="px-6 py-4">{student.section}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button onClick={() => handleDataPass("edit", student)} className="font-medium dark:text-green-500 hover:underline">Edit</button>
                                <button onClick={() => handleDataPass("delete", student)} className="fon-medium dark:text-red-500 hover:underline">Delete</button>
                                {/* onClick={() => handleDelete(student.studentid)} */} 
                                {/* i just to backup later i'll paste it again*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>       
    );
}

export default StudentsTable;