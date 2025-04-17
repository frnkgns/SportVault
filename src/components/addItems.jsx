import { useState } from "react";

function AddItems({onToggleShowAddItems, onToggleTableRefresh}){

        const [itemID, setItemID] = useState('');
        const [itemName, setItemName] = useState('');
        const [itemStocks, setItemStocks] = useState('');
        const [itemImage, setItemImage] = useState('');
        const [imagePreview, setImagePreview] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [errorMessage, setErrorMessage] = useState('');        

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
        setSuccessMessage("");    //set it by empty string
        setErrorMessage("");
    
        const response = await fetch('http://localhost:5000/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemID, itemName, itemStocks, itemImage }),
        });
        
        const data = await response.json();
      //   console.log('Server response:', data);
  
        //then kapag ok yung query fetcth message
        if (response.ok) {
          setSuccessMessage(data.message);
          setItemID("");
          setItemName("");
          setItemStocks("");
          setItemImage(null);
  
          onToggleTableRefresh();
        } else {
          setErrorMessage(data.error || "Something went wrong.");
        }
      };

    return(

        <div className="items-center h-screen w-screen justify-center flex flex-col inset-0 z-50 fixed shadow-2xl">
        <div className=" bg-gray-900 h-fit p-10 rounded-4xl flex w-fit flex-col text-white shadow-rose-50">
            <div className="flex">
                <p className="flex text-3xl mb-5 font-semibold">Item Listing Form</p>
                <button onClick={onToggleShowAddItems} className="rounded-lg translate-x-30 -translate-y-10 text-white hover:text-red-500">X</button>
            </div>

            <div>
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item ID</label>
                    <input onChange={(e) => setItemID(e.target.value)}
                    type="text" id="studentID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21-11345" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                    <input onChange={(e) => setItemName(e.target.value)}
                    type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jacob Michael P. Segundo" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stocks</label>
                    <input onChange={(e) => setItemStocks(e.target.value)}
                        type="text" id="course" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BSCS" required /> 
                </div>
                <div className="mb-5">
                    {/* this code below will allow us to open the files and select  photo */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleImagePreview}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    
                    {/* while this code below allow us to preview the image, but of course there are codes needed above*/}
                    <div className="w-[20rem] h-[10rem] flex justify-center m-4 border-2 border-gray-700 rounded-2xl">
                        <img className="m-2 rounded-lg" src={imagePreview} alt="Image Preview" />
                    </div>                    
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
        {successMessage && (
            <div class="flex items-center mt-10 p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Success!</span> {successMessage}
                </div>
            </div>
        )}

            {/* ❌ Error Message */}
        {errorMessage && (
            <div class="flex items-center p-4 mt-10 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                <span class="font-medium">Oops!</span> {errorMessage}
                </div>
          </div>
        )}            
    </div>

    );
    
}

export default AddItems;