function ConfirmBorrow({borrowedRecord, onCloseConfirmBorrow, AllowBorrow}) {
    
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
        </div>
    );
}

export default ConfirmBorrow;