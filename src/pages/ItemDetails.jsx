import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://api.restful-api.dev/objects/${id}`);
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading item details</p>;
    }

    return (
        <div className='w-[90%] mx-auto sm:w-[30rem] border-2 rounded-lg border-[#323A49] bg-[#040415]'>
            <h1 className='text-white'>{item.name}</h1>
           
           
            
        </div>
    );
};

export default ItemDetails;
