import { useState } from "react";
import Logo from '../assets/logo/sportsBorrowingSystem.jpeg'
import '../css/fonts.css'

function NavBar({ onToggleStudentTable, onToggleItemTable, onToggleItemPlacard }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ fontFamily: 'Sakana' }} className="flex justify-between text-xl bg-gray-900 text-white pl-10 pr-10 pt-3 pb-3 relative">
        <div className="flex gap-4 items-center">    
            <img className="h-[4rem] p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={Logo} alt="Bordered avatar"/>
            <p>SPORT VAULT</p>
        </div>
       
      <div className="space-x-10 flex items-center relative group">
        <button onClick={onToggleStudentTable} className="font-medium hover:text-sky-300">Students</button>
        <button
          onClick={() => setShowDropdown(prev => !prev)}
          onMouseEnter={() => setShowDropdown(prev => !prev)}
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
        >
          Items
          <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div onMouseLeave={() => setShowDropdown(prev => !prev)} className="absolute top-full right-10 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 drop-shadow-lg drop-shadow-white">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li><button onClick={onToggleItemPlacard} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">Show</button></li>
            <li><button onClick={onToggleItemTable} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">Edit</button></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
