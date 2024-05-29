import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slice/itemSlice';

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
        <div>
            <h1>Home</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            {!isLoading && !error && paginatedItems.length === 0 && <p>No data available</p>}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Generation</th>
                        <th>Price</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.data?.generation || 'N/A'}</td>
                            <td>{item.data?.price || 'N/A'}</td>
                            <td>{item.data?.capacity || item.data?.["capacity GB"] || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} </span>
                <button onClick={handleNextPage} disabled={startIndex + itemsPerPage >= data.length}>Next</button>
            </div>
        </div>
    );
};

export default Home;
