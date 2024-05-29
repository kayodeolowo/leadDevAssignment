import React, { useState } from 'react';

const EditModal = ({ currentTitle, currentBody, onSave, onCancel }) => {
    const [editTitle, setEditTitle] = useState(currentTitle);
    const [editBody, setEditBody] = useState(currentBody);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await onSave(editTitle, editBody);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-white border w-[90%] md:w-[50%] border-gray-600 bg-[#171923] p-4 rounded-md">
                <h2>Edit Post</h2>
                <div className="mt-4">
                    <label className='block mb-2'>Title:</label>
                    <input 
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        className='border border-gray-600 bg-inherit rounded p-2 w-full'
                    />
                </div>
                <div className="mt-4">
                    <label className='block mb-2'>Body:</label>
                    <textarea 
                        value={editBody} 
                        onChange={(e) => setEditBody(e.target.value)} 
                        className='border border-gray-600 bg-inherit h-[10rem] rounded p-2 w-full'
                    />
                </div>
                <div className="mt-4 flex space-x-4">
                    <button 
                        onClick={onCancel} 
                        className='bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-700 transition ease-in duration-300'
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className={`px-4 py-2 text-white rounded-md ${isSaving ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700 transition ease-in duration-300'}`}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
