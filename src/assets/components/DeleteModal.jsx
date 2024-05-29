import React, { useState } from 'react';

const DeleteModal = ({ onDelete, onCancel }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        await onDelete();
        setIsDeleting(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-white border w-[90%] flex flex-col justify-center items-center md:w-[20%] border-gray-600 bg-[#171923] p-4  md:py-12 rounded-md">
                <h2>Are you sure you want to delete?</h2>
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={onCancel}
                        className='bg-gray-500 px-4 py-2 text-white rounded-md'
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className={`px-4 py-2 text-white rounded-md ${isDeleting ? 'bg-red-900' : 'bg-red-500'}`}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
