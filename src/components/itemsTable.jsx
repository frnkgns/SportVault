import { useEffect, useState } from "react";

//instead calling this as parameter call it as props
function ItemsTable({refreshSignal, showConfirmDelete, onToogleAddItem}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchitems = async () => {
            try {
                const response = await fetch("http://localhost:5000/allitems");
                const data = await response.json();
                setItems(data);

                console.log(data);
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };

        fetchitems();

        //using the props to enable the refetch
    }, [refreshSignal]);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-white">
                <thead className="text-xl uppercase bg-gray-50 dark:bg-gray-700 text-white">
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
                <tbody>
                    {items.map((item) => (
                        <tr key={item.itemid} className="text-xl; bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{item.itemid}</td>
                            <td className="px-6 py-4">{item.itemname}</td>
                            <td className="px-6 py-4">{item.stocks}</td>
                            <td className="px-6 py-3 h-32"> {/* Set desired width */}
                                {item.image ? (
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
                                <button className="font-medium dark:text-green-500 hover:underline">Edit</button>
                                <button onClick={() => showConfirmDelete(item.itemid, item.itemname)} className="fon-medium dark:text-red-500 hover:underline">Delete</button>
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