import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slice/itemSlice';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.items);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='w-[95%] xl:w-[70%] mx-auto'>
            {isLoading && <p className='text-white text-xs font-semibold text-center mt-[15%]'>Loading Posts please wait...</p>}
            {error && <p className='text-red-500'>Error loading data</p>}
            {!isLoading && !error && paginatedItems.length === 0 && <p className='text-white'>No data available</p>}
            {paginatedItems.map(item => (
                <Link to={`/item/${item.id}`} key={item.id}> 
                    <div className='text-white border rounded-md p-4 border-gray-600 hover:bg-[#1d2031] bg-[#171923] mt-8'>
                        <h1 className='text-lg font-bold'>{item.title}</h1>
                        <p className='mt-2 text-sm text-gray-300'>{item.body}</p>
                    </div>
                </Link>
            ))}
            <div className='mb-20 text-white mt-6 flex items-center space-x-4 bg-[#464667] px-4 py-1 rounded w-fit'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <MdOutlineArrowBackIos className='hover:cursor-pointer' />
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={startIndex + itemsPerPage >= data.length}>
                    <MdOutlineArrowForwardIos className='hover:cursor-pointer' />
                </button>
            </div>
        </div>
    );
};

export default Home;
