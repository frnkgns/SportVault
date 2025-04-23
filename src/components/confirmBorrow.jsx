function ConfirmBorrow({borrowedRecord, onCloseConfirmBorrow, AllowBorrow, successMessage, errorMessage}) {
    
    return(
        <div className="confirm-borrow bg-gray-900 h-fit pl-10 pr-10 pt-5 pb-5 rounded-lg flex w-[30rem] flex-col text-white">
            <p className="text-xl">Confirm Borrow</p><br />
            <p>
                <span className="text-yellow-500">{borrowedRecord.data[0].studentname}</span> already borrowed   
                {borrowedRecord.data.length > 1 ? <span className="text-yellow-500"> {borrowedRecord.data.length} items</span>  : ' an item'}</p>

            <div className="overflow-y-auto shadow-md rounded-lg max-h-[15rem] mt-4 no-scrollbar">
                <table className="rounded-lg w-full">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                        <tr>
                            <th scope="col" className="text-start px-6 py-3">Item Name</th>
                            <th scope="col" className="text-start px-6 py-3">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 dark:text-white">
                        {borrowedRecord.data.map((item) => (
                            <tr key={item.itemname} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 ">{item.itemname}</td>
                                <td className="px-6 py-4 ">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4">will you allow <span className="text-yellow-500">{borrowedRecord.data[0].studentname.slice(0,5)} borrow another item?</span></p>
            <div className="flex justify-between mt-4 mb-4 gap-10">
                <button type="button" onClick={AllowBorrow} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Yes</button>
                <button type="button" onClick={onCloseConfirmBorrow} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">No</button>
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

export default ConfirmBorrow;