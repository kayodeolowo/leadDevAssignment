import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slice/itemSlice';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.items);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='w-[95%] mx-auto'>
            <p className='text-white'>{isLoading && <p>Loading...</p>}</p>
            {error && <p>Error loading data</p>}
            {!isLoading && !error && paginatedItems.length === 0 && <p>No data available</p>}

            <div className="overflow-x-auto border-2 rounded-lg border-[#323A49] bg-[#040415] mt-10">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead>
                                <tr className='bg-[#464667] pt-10 text-gray-300'>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium">Name</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium">Generation</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium">Price</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium">Capacity</th>
                                </tr>
                            </thead>
                            <tbody className='divide-gray-500 divide-y'>
                                {paginatedItems.map(item => (
                                    <tr key={item.id} className='hover:bg-[#25253a]'>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <Link to={`/item/${item.id}`} className='block'>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <Link to={`/item/${item.id}`} className='block'>
                                                {item.data?.generation || '-'}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <Link to={`/item/${item.id}`} className='block'>
                                                {item.data?.price || '-'}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <Link to={`/item/${item.id}`} className='block'>
                                                {item.data?.capacity || item.data?.["capacity GB"] || '-'}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='text-white mt-4 flex items-center space-x-4 bg-[#464667] px-4 py-1 rounded w-fit'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}><MdOutlineArrowBackIos className='hover:cursor-pointer' /></button>
                <span> Page {currentPage} </span>
                <button onClick={handleNextPage} disabled={startIndex + itemsPerPage >= data.length}><MdOutlineArrowForwardIos className='hover:cursor-pointer' /></button>
            </div>
        </div>
    );
};

export default Home;
