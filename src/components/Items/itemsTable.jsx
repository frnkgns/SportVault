import axios from "axios";
import { useEffect, useState } from "react";

//instead calling this as parameter call it as props
function ItemsTable({refreshSignal, showConfirmDelete ,onToogleAddItem, showEdit}) {
    const [items, setItems] = useState([]);

    // Retrieving the data from the database through routes
    useEffect(() => {
        const fetchitems = async () => {
            try {
                const response = await axios.get("http://localhost:5000/allitems");
                setItems(response.data);                
                console.log(response.data);
                
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };

        fetchitems();

        //using the props to enable the refetch
    }, [refreshSignal]);

    return (
        <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-[35em] -mt-8">
            <table className="w-full text-left text-white table-fixed">
                <thead className="text-base 2xl:text-xl uppercase bg-gray-50 dark:bg-gray-700 text-white sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Item Id</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Stocks</th>
                        <th className="px-6 py-3">Image</th>
                        <th className="px-6 py-3 justify-end flex">
                            <button onClick={onToogleAddItem}
                            className="ml-5 bg-blue-700 border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-300 hover:border-blue-200 hover:text-black">
                                NEW</button>
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {items.map((item) => (
                        <tr key={item.itemid} className="text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{item.itemid}</td>
                            <td className="px-6 py-4">{item.itemname}</td>
                            <td className="px-6 py-4">{item.stocks}</td>
                            <td className="px-6 py-3 h-32">
                                {item.image ? (
                                    // Loading the image using its name and localhost
                                    // since the image is on the folder only the name is saved in the database
                                    <img
                                        src={`http://localhost:5000/images/${item.image}`}
                                        alt="item"
                                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                                )}
                                </td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button onClick={() => onToogleAddItem(item.itemid, item.itemname, "items", item.image, item.stocks, "edit")} className="font-medium dark:text-green-500 hover:underline">Edit</button>
                                <button onClick={() => showConfirmDelete(item.itemid, item.itemname, "items", item.image, item.stocks, "delete")} className="fon-medium dark:text-red-500 hover:underline">Delete</button>
                                {/* onClick={() => handleDelete(item.itemid)} */} 
                                {/* i just to backup later i'll paste it again*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>       
    );
}

export default ItemsTable;