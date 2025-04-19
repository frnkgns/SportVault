import { useEffect, useState } from "react";

//instead calling this as parameter call it as props
function StudentsTable({refreshSignal, showConfirmDelete, onToggleStudentReg}) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/allstudents");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students:", error);
            }
        };

        fetchStudents();

        //using the props to enable the refetch
    }, [refreshSignal]);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-white">
                <thead className="text-xl uppercase bg-gray-50 dark:bg-gray-700 text-white">
                    <tr>
                        <th className="px-6 py-3">Student ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Course</th>
                        <th className="px-6 py-3">Section</th>
                        <th className="px-6 py-3 justify-end flex">
                            <button onClick={onToggleStudentReg}
                            className="ml-5  bg-blue-700 border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-300 hover:border-blue-200 hover:text-black">REGISTER</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentid} className="text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{student.studentid}</td>
                            <td className="px-6 py-4">{student.studentname}</td>
                            <td className="px-6 py-4">{student.course}</td>
                            <td className="px-6 py-4">{student.section}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button className="font-medium dark:text-green-500 hover:underline">Edit</button>
                                <button onClick={() => showConfirmDelete(student.studentid, student.studentname, "student", "")} className="fon-medium dark:text-red-500 hover:underline">Delete</button>
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