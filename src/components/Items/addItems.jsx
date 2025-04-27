import { useState, useEffect } from "react";
import axios from "axios";
import OperationMessage from "../operationMessage";

function AddItems({onToggleShowAddItems, onToggleTableRefresh, data}){

        const [itemId, setItemId] = useState(''); //this is the id of the item that we are going to edit
        //we will pass it to the route and in there we will check if there is an id retrieve
        // if not then it means we are adding a new item
        //if there its an id then we are editing the item

        let oldImage = data.img; // this is the image of the item that we are going to edit
        // if the image is not changed then we will use the old image name to update the item in the database
        // we no longer need to upload the data again in the folder and database

        const [itemName, setItemName] = useState('');
        const [itemStocks, setItemStocks] = useState('');
        const [itemImage, setItemImage] = useState("http://localhost:5000/images/sportsBorrowingSystem.jpeg");   // default image
        const [imagePreview, setImagePreview] = useState("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); // default image
        
        const [showMessageModal, setShowMessageModal] = useState(false);
        const [messageData, setMessageData] = useState({message: '', type: ''});

        let ImageName = '';

        //we will use this useEffect if the this form was called from the edit button in the table
        //this will allow us to edit the data in the database
        // Reset states every time the modal opens or the 'data' changes
        // using a useEffect to reset the states when the modal opens
        // it prevent the re rendering of the modal when the data is passed from the table
        useEffect(() => {
            if (data && data.id !== null) {
                switch (data.method) {
                    case "edit":
                        setItemId(data.id);
                        setItemName(data.name);
                        setItemStocks(data.stocks);
                        setImagePreview("http://localhost:5000/images/" + data.img);
                        setItemImage(data.img);
                        break;
                    
                    default:    //default if the case is "new"
                        setImagePreview("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); // clear preview
                        setItemImage("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); 
                        break;
                }
            }

            console.log("AddItems", data);

        }, [data]);

        const handleResetVariables = () => {
            setItemId('');
            setItemName("");
            setItemStocks("");      //clearing values allow us to have a clean input avoiding crossing errors
            setItemImage("http://localhost:5000/images/sportsBorrowingSystem.jpeg");   
            setImagePreview("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); // clear preview
            onToggleShowAddItems(); // close the modal
        }
        


    const handleImagePreview = (e) => {
        const imageFile = e.target.files[0];
        setItemImage(imageFile);

        if(imageFile){
            const imageUrl = URL.createObjectURL(imageFile);
            setImagePreview(imageUrl);
        }  else {
            setImagePreview(null);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if not similar to the old image name then we will upload the new image to the folder and database
            if (itemImage != oldImage) {
                const formData = new FormData();
                formData.append('image', itemImage);
                const uploadRes = await axios.post('http://localhost:5000/images', formData);
                ImageName = uploadRes.data.filename;
                console.log('Uploaded:', ImageName);
            } else {
                ImageName = oldImage; // use the old image name if not changed
            }
    
            // Then send the rest of the data
            const response = await axios.post('http://localhost:5000/items', {
                itemId, itemName, itemStocks, itemImage: ImageName, tableCateg: "items"
            });
    
            if (response.status === 200) {
                setMessageData({ message: response.data.message, type: "success" });
                setShowMessageModal(true);
                onToggleTableRefresh();
                handleResetVariables(); // Reset the form fields after successful submission
            } else {
                setMessageData({ message: response.data.message, type: "error" });
                setShowMessageModal(true);
            }

            setTimeout(() => {
                setShowMessageModal(false);
                setMessageData({ message: '', type: '' }); // optional clean-up
            }, 1000)

        } catch (err) {
            // setErrorMessage("Error uploading file or submitting form.");
            console.error(err);
        }
    };

    return(
        <div className="items-center h-screen w-screen justify-center flex flex-col inset-0 z-50 fixed drop-shadow-white drop-shadow-2xl">
            {showMessageModal && 
                <OperationMessage
                message={messageData.message}
                type={messageData.type}
            />}

            <div className=" bg-gray-900 h-fit p-10 rounded-4xl flex w-fit flex-col text-white justify-center">
                <div className="flex">
                    <p className="flex text-3xl mb-10 font-semibold">{itemId ? 'EDIT' : 'ITEM'} LISTING FORM</p>
                    <button onClick={handleResetVariables} className="rounded-lg translate-x-30 -translate-y-10 text-white hover:text-red-500">X</button>
                </div>

                <div className="text-xl">
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="flex space-x-5 w-fit">
                            <div className="mb-5">
                                <label className="block mb-2  font-medium text-gray-900 dark:text-white">Name</label>
                                <input onChange={(e) => setItemName(e.target.value)}
                                value={itemName} type="text" id="ItemName" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BasketBall" required />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2  font-medium text-gray-900 dark:text-white">Stocks</label>
                                <input onChange={(e) => setItemStocks(e.target.value)}
                                value={itemStocks} type="number" id="ItemStocks" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100" required /> 
                            </div>
                    </div>
                    <div className="mb-5">
                            {/* this code below will allow us to open the files and select  photo */}
                            <div>
                                <label className="block mb-2  font-medium text-gray-900 dark:text-white">Image</label>
                                <input 
                                    type="file"
                                    value={''}
                                    accept="image/*"
                                    onChange={handleImagePreview}
                                    className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                {/* changing type of input allow us to identify what data are we gonna pass */}
                            </div>  
                        </div>
                        
                    {/* while this code below allow us to preview the image, but of course there are codes needed above*/}
                    <div className="w-auto h-[10rem] flex justify-center bg-neutral-500 mt-4 mb-4 border-2 border-gray-700 rounded-2xl">
                        <img className="object-cover w-full rounded-lg" src={imagePreview} alt="Image Preview" />
                    </div>                  
                        
                    <button onClick={onToggleTableRefresh} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
      
    </div>

    );
    
}

export default AddItems;