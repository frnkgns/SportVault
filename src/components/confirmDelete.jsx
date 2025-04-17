// import express from 'express';
// import pool from "../../server/db";
import React, { useState } from "react";

//always capitalize the name of the function
function ConfirmDelete({onToggleConfirmationModal, studentId, studentName}){
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/student/${studentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onToggleConfirmationModal(); // This will refresh table and close modal
      } else {
        const errData = await res.json();
        console.error(`Failed to delete: ${errData.message || errData.error}`);
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    } finally {
      setIsDeleting(false);
    }
  }; 

    return(
        <div className="w-screen h-screen items-center justify-center flex inset-0 z-50 fixed shadow-2xl">
            <div className="flex flex-col items-center w-fit p-10 bg-gray-700 rounded-xl text-white">
                <p className="flex text-center"> Are you sure you want to delete <br />{studentId} {studentName} </p>
                <div className="flex mt-5 space-x-10">
                    <button  onClick={handleDelete} disabled={isDeleting} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-green-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {isDeleting ? 'Deleting...' : 'Confirm'}</button>
                    <button onClick={() => onToggleConfirmationModal(false)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Cancel</button>            
                </div>
            </div>
        </div>  
    );
}

export default ConfirmDelete;