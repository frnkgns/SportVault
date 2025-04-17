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
            <table className="w-full text-sm text-left text-gray-500 text-white">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 text-white">
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
                        <tr key={student.studentid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{student.studentid}</td>
                            <td className="px-6 py-4">{student.studentname}</td>
                            <td className="px-6 py-4">{student.course}</td>
                            <td className="px-6 py-4">{student.section}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button className="font-medium dark:text-green-500 hover:underline">Edit</button>
                                <button onClick={() => showConfirmDelete(student.studentid, student.studentname)} className="fon-medium dark:text-red-500 hover:underline">Delete</button>
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


// function StudentsTable(){
//     return(
//         <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" class="px-6 py-3">
//                             Product name
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                             <div class="flex items-center">
//                                 Color
//                                 <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
//         </svg></a>
//                             </div>
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                             <div class="flex items-center">
//                                 Category
//                                 <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
//         </svg></a>
//                             </div>
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                             <div class="flex items-center">
//                                 Price
//                                 <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
//         </svg></a>
//                             </div>
//                         </th>
//                         <th scope="col" class="px-6 py-3">
//                             <span class="sr-only">Edit</span>
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
//                         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                             Apple MacBook Pro 17"
//                         </th>
//                         <td class="px-6 py-4">
//                             Silver
//                         </td>
//                         <td class="px-6 py-4">
//                             Laptop
//                         </td>
//                         <td class="px-6 py-4">
//                             $2999
//                         </td>
//                         <td class="px-6 py-4 text-right">
//                             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                         </td>
//                     </tr>
//                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
//                         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                             Microsoft Surface Pro
//                         </th>
//                         <td class="px-6 py-4">
//                             White
//                         </td>
//                         <td class="px-6 py-4">
//                             Laptop PC
//                         </td>
//                         <td class="px-6 py-4">
//                             $1999
//                         </td>
//                         <td class="px-6 py-4 text-right">
//                             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                         </td>
//                     </tr>

//                     <tr class="bg-white dark:bg-gray-800">
//                         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                             Magic Mouse 2
//                         </th>
//                         <td class="px-6 py-4">
//                             Black
//                         </td>
//                         <td class="px-6 py-4">
//                             Accessories
//                         </td>
//                         <td class="px-6 py-4">
//                             $99
//                         </td>
//                         <td class="px-6 py-4 text-right">
//                             <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// }