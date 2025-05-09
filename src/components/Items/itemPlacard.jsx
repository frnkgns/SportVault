import '../../css/invertedDesign.css'
import { useEffect, useState } from "react";
import '../../css/fonts.css'
import axios from 'axios';

import BorrowItem from './borrowItem';

function ItemPlacard(){
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(false);

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
    }, []);

    //handle borrow request, we are passing the item id and image to the borrowItem component
    const handleBorrow = async (item) => {
        setSelectedItem(item);
    };


    return(
        <div style={{ fontFamily: 'Sakana' }} className="p-10 text-xs flex gap-10 flex-wrap justify-center max-h-[35rem] overflow-y-auto no-scrollbar">
            {items.map((item) => (
                <div key={item.itemid} className="transition duration-500 hover:scale-125 flex flex-col max-w-[15rem] max-h-[30rem] rounded-lg">
                    <div className="h-[10rem] w-[15rem] relative"> 
                        <div className="upperShape absolute w-[7rem] h-6 bg-white text-center">{item.itemname}</div>
                        <img onClick={() => handleBorrow(item)} 
                        src={`http://localhost:5000/images/${item.image}`} alt="" className="rounded-t-lg object-cover h-full w-full" />
                        <div className="lowerRightShape absolute w-[2rem] h-10 bg-white text-center right-0 bottom-0 items-center flex justify-center">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M7.47 12.78a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 0 0-1.06-1.06L8 11.19 5.28 8.47a.75.75 0 0 0-1.06 1.06l3.25 3.25ZM4.22 4.53l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 0 0-1.06-1.06L8 6.19 5.28 3.47a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="lowerLeftShape absolute w-[4rem] h-6 bg-white text-center flex items-center bottom-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 z-20">
                                <path d="M3 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Z" />
                                <path fillRule="evenodd" d="M3 6h10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm3 2.75A.75.75 0 0 1 6.75 8h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 8.75Z" clipRule="evenodd" />
                            </svg>
                            {item.stocks}</div>
                    </div>
                </div>
            ))}
            
            {selectedItem && (
                <div className="fixed inset-0 bg-transparent drop-shadow-2xl drop-shadow-black bg-opacity-60 flex justify-center items-center z-50">
                    <BorrowItem
                        itemid={selectedItem.itemid}
                        itemImage={selectedItem.image}
                        itemName={selectedItem.itemname}
                        onClose={() => setSelectedItem(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default ItemPlacard;