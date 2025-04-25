import { useEffect, useState } from "react";
import axios from "axios";

function AddItems({onToggleShowAddItems, onToggleTableRefresh, data}){

        const [itemName, setItemName] = useState('');
        const [itemStocks, setItemStocks] = useState('');
        const [itemImage, setItemImage] = useState("http://localhost:5000/images/sportsBorrowingSystem.jpeg");   // default image
        const [imagePreview, setImagePreview] = useState("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); // default image
        const [successMessage, setSuccessMessage] = useState('');
        const [errorMessage, setErrorMessage] = useState('');    
        
        let ImageName = '';
        
        //we will use this useEffect if the this form was called from the edit button in the table
        //this will allow us to edit the data in the database
        useEffect(() => {
            if(data){
                setItemName(data.name); //this is the name of the item that we are going to edit
                setItemStocks(data.stocks); 
                setImagePreview("http://localhost:5000/images/" + data.image); 
                setItemImage(data.img); // this is the image of the item that we are going to edit
            }
        }, [data]);

        console.log("AddItems Data", data);

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
        setSuccessMessage("");
        setErrorMessage("");
    
        try {
            // First upload the image
            if (itemImage) {
                const formData = new FormData();
                formData.append('image', itemImage);
                const uploadRes = await axios.post('http://localhost:5000/images', formData);
                ImageName = uploadRes.data.filename;
                console.log('Uploaded:', ImageName);
            }
    
            // Then send the rest of the data
            const response = await axios.post('http://localhost:5000/items', {
                itemName, itemStocks, itemImage: ImageName,
            });
    
            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setItemName("");
                setItemStocks("");      //clearing values allow us to have a clean input avoiding crossing errors
                setItemImage("http://localhost:5000/images/sportsBorrowingSystem.jpeg");   
                setImagePreview("http://localhost:5000/images/sportsBorrowingSystem.jpeg"); // clear preview
                onToggleTableRefresh();
            } else {
                setErrorMessage(response.data.error || "Something went wrong.");
            }

        } catch (err) {
            setErrorMessage("Error uploading file or submitting form.");
            console.error(err);
        }
    };

    return(
        <div className="items-center h-screen w-screen justify-center flex flex-col inset-0 z-50 fixed drop-shadow-white drop-shadow-2xl">
            <div className=" bg-gray-900 h-fit p-10 rounded-4xl flex w-fit flex-col text-white justify-center">
                <div className="flex">
                    <p className="flex text-3xl mb-10 font-semibold">ITEM LISTING FORM</p>
                    <button onClick={onToggleShowAddItems} className="rounded-lg translate-x-30 -translate-y-10 text-white hover:text-red-500">X</button>
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

            {/* ❌ Error Message */}
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

export default AddItems;