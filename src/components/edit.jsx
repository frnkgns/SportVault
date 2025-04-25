import '../css/fonts.css'
import { useEffect, useState } from 'react';

// this file was called in app.jsx and we are going to use it to edit the data in the database

function Edit({ data, onChange, onToggleEdit} ) {
    const [name ,setName] = useState('');
    const [image, setImage] = useState('');

    //to fix the error of useEffect, we need to put the data in the dependency array react-dom_client.js?v=8abc02cd:4266 Uncaught Error: Too many re-renders. React limits 
    //use this use effect to avoid infinite loops, so we need to put the data in the dependency array
    useEffect(() => {
      if(data){
        setName(data.name); //this is the name of the item that we are going to edit
        setImage("http://localhost:5000/images/" + data.img); 
      }

      console.log("Edit Data", data);
    }, [data])

  return (
    <div className="text-white w-screen h-screen flex items-center top-0 inset-0 z-50 fixed">
      <div className='bg-gray-900 p-4 rounded shadow-md mx-auto mt-10 w-fit'>
        <div className='flex justify-between items-center mb-4 text-lg'>
          <p>Edit {}</p>
          <button className='hover:text-red-500'
          onClick={onToggleEdit}>X</button>
        </div>
        <input
          type="text"
          value={name}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={data}
          placeholder='Enter your text here...'
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="w-auto h-[10rem] flex justify-center bg-neutral-500 mt-4 mb-4 border-2 border-gray-700 rounded-2xl">
          <img className="object-cover w-full rounded-lg" src={image} alt="Image Preview" />
        </div>                  
      </div>
    </div>
  );
}

export default Edit;