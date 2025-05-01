import { useState } from 'react';
import { useEffect } from 'react';

function OperationMessage({ message, type, closeOperationModal }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (type === 'success') {
            setSuccessMessage(message);
            setErrorMessage('');
            setShowSuccessMessage(true);
        } else if (type === 'error') {
            setErrorMessage(message);
            setSuccessMessage('');
            setShowErrorMessage(true);
        }

        setTimeout(() =>{
            closeOperationModal();
        }, 5000)

    }, [message, type]);

    console.log("OperationMessage", message, type);

  return (
    <div className="top-0 right-0">
        {showSuccessMessage && (
            <div className="flex top-0 right-0 items-center mt-10 p-4 mb-4  text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Success!</span> {successMessage}
                </div>
            </div>
        )}

        {showErrorMessage && (
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

export default OperationMessage;