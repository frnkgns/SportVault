// import express from 'express';
// import pool from "../../server/db";
import axios from "axios";
import React, { useState } from "react";

//always capitalize the name of the function
//this jsx will be use for two types for deleting students and deleting items
//you will c
function ConfirmDelete({data, onToggleConfirmationModal, messageModal}){
    const [isDeleting, setIsDeleting] = useState(false);

    console.log("Data in confirmDelete:", data); // ✅ Add this

    const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(
        data.type == "student" ? 
        `http://localhost:5000/student/${data.id}` 
        : `http://localhost:5000/items/${data.id}`, {
      });

      if (res.status === 200) {
        if(data.img){
          console.log("Trying to delete image:", data.img);
          await axios.delete(`http://localhost:5000/images/${data.img}`, {
          });
        } else{
          console.log("Trying to delete this image ", data.img, "but i dont know why its not working"); // ✅ Add this
        }

        onToggleConfirmationModal(); // This will refresh table and close modal
        messageModal("Deletion complete.", "success");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Something went wrong while deleting.";
      messageModal("Deleting record error: ", errorMsg, "error");
      console.error("❌ Error deleting:", errorMsg);    
  
    } finally {
      setIsDeleting(false);
    }
  }; 

    return(
        <div className="w-screen h-screen items-center justify-center flex inset-0 z-50 fixed shadow-2xl">
            <div className="flex flex-col items-center w-fit p-10 bg-gray-700 rounded-xl text-white">
                <p className="flex text-center"> Are you sure you want to delete <br />{data.id} {data.name} </p>
                <div className="flex mt-5 space-x-10">
                    <button  onClick={handleDelete} disabled={isDeleting} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-green-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {isDeleting ? 'Deleting...' : 'Confirm'}</button>
                    <button onClick={() => onToggleConfirmationModal(false)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Cancel</button>            
                </div>
            </div>
        </div>  
    );
}

export default ConfirmDelete;