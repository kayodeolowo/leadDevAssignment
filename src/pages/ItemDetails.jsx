import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from '../assets/components/DeleteModal';
import EditModal from '../assets/components/EditModal';

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItem(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(true);
                setIsLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success('Item deleted successfully');
            setShowDeleteModal(false);
            setTimeout(() => {
                navigate('/'); // Redirect to another page after deletion
            }, 2000);
        } catch (error) {
            console.error('Delete error:', error);
            setError(true);
        }
    };

    const handleEdit = async (title, body) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    title,
                    body,
                    userId: item.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItem(data);
            toast.success('Item edited successfully');
            setShowEditModal(false);
        } catch (error) {
            console.error('Edit error:', error);
            setError(true);
        }
    };

    if (isLoading) {
        return <p className='text-white text-xs font-semibold text-center mt-[15%]'>Loading Posts please wait...</p>;
    }

    if (error) {
        return <p>Error loading item details</p>;
    }

    return (
        <div className='w-[95%] xl:w-[70%] mx-auto'>
            <div className='text-white border rounded-md p-4 border-gray-600 bg-[#171923] mt-8'>
                <h1 className='text-lg font-semibold'> {item.title} </h1>
                <p> {item.body}  </p>

                <div className='flex space-x-4 w-fit ml-auto mt-8'>
                    <button 
                        onClick={() => setShowEditModal(true)} 
                        className='bg-green-500 transition ease-in decoration-neutral-300 hover:bg-green-900 px-4 text-xs font-semibold rounded py-2'
                    >
                        Edit Post
                    </button>
                    <button 
                        onClick={() => setShowDeleteModal(true)} 
                        className='bg-red-500 transition ease-in decoration-neutral-300 hover:bg-red-900 px-4 text-xs font-semibold rounded py-2'
                    >
                        Delete Post
                    </button>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal 
                    onDelete={handleDelete} 
                    onCancel={() => setShowDeleteModal(false)} 
                />
            )}

            {showEditModal && (
                <EditModal 
                    currentTitle={item.title} 
                    currentBody={item.body} 
                    onSave={handleEdit} 
                    onCancel={() => setShowEditModal(false)} 
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default ItemDetails;
