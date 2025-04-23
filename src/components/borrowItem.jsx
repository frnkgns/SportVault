import { useState } from "react";
import axios from "axios";
import ConfirmBorrow from "./confirmBorrow";


function BorrowItem({itemid, itemImage, itemName, onClose}){
    const [studentID, setStudentID] = useState('');
    const [quantity , setQuantity] = useState('');
    const [borrowedRecord, setborrowedRecord] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);


    // after retrieving those item id and image we need to send it to the backend
    // and then we need to send the student id and stocks to the backend too
    const handleBorrow = async (e, AllowBorrowerAnotherItem) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/borrowItem', {
                studentid: studentID,
                itemid,
                quantity,
                allow: AllowBorrowerAnotherItem
            });

            // Handle success response here
            // You can also check the response status and show a success message if needed
            if (response.status === 201) {
                setStudentID('');
                setQuantity('');
                console.log('Borrow Approved:', response.data);
                onClose(); // close modal

                                // ill put some animations later on here
                // setTimeout(() => {
                    
                // }, 2000);

            }  else if(response.status === 200) {
                console.log('Student has already borrowed an item:', response.data);
                setborrowedRecord(response.data);
                setShowConfirmationModal(true);
                
            }
            
        } catch (err) {
            console.error("Something Went Wrong:", err);
            // Handle error response here
        }
    };

    // Modal
    return(
        <div className="bg-gray-900 h-fit pl-10 pr-10 pt-5 pb-5 rounded-lg flex w-fit flex-col text-white justify-center items-center">
            <form className="max-w-sm mx-auto" onSubmit={(e) => handleBorrow(e, false)}>
                <p className="text-lg">Borrowing {itemName}</p>
                <div className="w-auto h-[10rem] flex justify-center bg-neutral-500 mt-4 mb-4 border-2 border-gray-700 rounded-2xl">
                    <img className="object-cover w-full rounded-lg" src={`http://localhost:5000/images/${itemImage}`} alt="Image Preview" />
                </div>    

                <div className="flex gap-10">
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Student ID</label>
                        <input value={studentID} onChange={(e) => setStudentID(e.target.value)}
                        type="text" id="studentID" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21-11345" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input onChange={(e) => setQuantity(e.target.value)}
                        value={quantity} type="number" id="ItemStocks" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100" required /> 
                    </div>
                </div>
                
                <div className="flex gap-10 justify-between">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                    <button type="button" onClick={() => onClose()} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                </div>
            </form>

            <div className="flex justify-center items-center mt-4 absolute bg-transparent bg-opacity-50 drop-shadow-2xl drop-shadow-white">
                {showConfirmationModal && 
                <ConfirmBorrow
                onCloseConfirmBorrow={() => setShowConfirmationModal(false)}
                borrowedRecord={borrowedRecord}
                AllowBorrow={(e) => handleBorrow(e, true)}/>}
            </div>
        
        </div>
    );
}

export default BorrowItem;