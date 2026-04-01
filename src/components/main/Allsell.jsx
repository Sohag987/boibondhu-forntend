import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Allsell = () => {
    const API = 'http://144.79.133.207:8000';

    const [sellbooks, setSellbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchBooks = useCallback(async (query = '', page = 1) => {
        try {
            setError(null);

            if (query) {
                setSearchLoading(true);
            } else {
                setLoading(true);
            }

            const { data } = await axios.get(`${API}/book-for-sell/`, {
                params: {
                    ...(query ? { search: query } : {}),
                    page,
                }
            });

            setSellbooks(data.results);
            setTotalCount(data.count);
            setNextPage(data.next);
            setPrevPage(data.previous);

        } catch (err) {
            setError(err.message);
        } finally {
            if (query) {
                setSearchLoading(false);
            } else {
                setLoading(false);
            }
        }
    }, []);

    // 🔍 Debounced search (only resets page)
    useEffect(() => {
        const delay = setTimeout(() => {
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    // 📡 Single source of API call
    useEffect(() => {
        fetchBooks(searchQuery, currentPage);
    }, [currentPage, searchQuery, fetchBooks]);

    const handlePrev = () => {
        if (prevPage) setCurrentPage((p) => p - 1);
    };

    const handleNext = () => {
        if (nextPage) setCurrentPage((p) => p + 1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) return (
        <div className='min-h-screen bg-[#F5EFE8] flex items-center justify-center'>
            <p className='text-[#8C7B6E] text-sm animate-pulse'>Loading books...</p>
        </div>
    );

    if (error) return (
        <div className='min-h-screen bg-[#F5EFE8] flex items-center justify-center'>
            <p className='text-red-400 text-sm'>Error: {error}</p>
        </div>
    );

    return (
        <main className='bg-[#F5EFE8] min-h-screen px-8 py-8'>

            {/* Header */}
            <div className='mb-6 border-b border-[#C8B9A8] pb-4 flex items-center justify-between'>
                <div>
                    <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Books</h2>
                    <p className='text-[#8C7B6E] text-xs mt-0.5'>
                        {searchLoading ? 'Searching...' : `${totalCount} titles available`}
                    </p>
                </div>

                {/* Search */}
                <div className='flex items-center gap-2 bg-[#EDE4D8] border border-[#C8B9A8] rounded-lg px-3 py-2 focus-within:border-[#8C7B6E] transition-all duration-150'>
                    <svg className='w-3.5 h-3.5 shrink-0' viewBox='0 0 16 16' fill='none' stroke='#8C7B6E' strokeWidth='1.5'>
                        <circle cx='6.5' cy='6.5' r='4.5' />
                        <path d='M10 10L14 14' />
                    </svg>

                    <input
                        type='text'
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder='Search by title or author...'
                        className='bg-transparent outline-none text-xs text-[#2C2416] placeholder-[#8C7B6E] w-40'
                    />

                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className='text-[#8C7B6E] hover:text-[#2C2416] text-xs'
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Empty */}
            {!searchLoading && sellbooks.length === 0 && (
                <div className='flex flex-col items-center justify-center py-20 gap-2'>
                    <p className='text-[#2C2416] text-sm font-medium'>No books found</p>
                    <p className='text-[#8C7B6E] text-xs'>Try a different search term</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className='mt-3 text-xs text-[#8C7B6E] hover:text-[#2C2416] underline'
                    >
                        Clear search
                    </button>
                </div>
            )}

            {/* Grid */}
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {sellbooks.map((book, index) => (
                    <li
                        key={book.id ?? index}
                        className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 flex flex-col gap-3 hover:border-[#8C7B6E] hover:shadow-sm'
                    >
                        <div className='rounded-lg h-40 overflow-hidden border border-[#C8B9A8]'>
                            <Link to={`/book-for-sell/${book.slug}/`}>
                                <img
                                    src={book.picture1}
                                    alt={book.book_name}
                                    className='w-full h-full object-cover'
                                />
                            </Link>
                        </div>

                        <div>
                            <p className='text-[#2C2416] text-sm font-semibold line-clamp-2'>
                                {book.book_name}
                            </p>
                            <p className='text-[#8C7B6E] text-xs'>{book.author_name}</p>
                        </div>

                        <div className='flex justify-between mt-auto pt-2 border-t border-[#C8B9A8]'>
                            <span className='text-[#2C2416] text-sm font-semibold'>
                                {book.price} Taka
                            </span>

                            <Link to={`/book-for-sell/${book.slug}/`}>
                                <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-3 py-1.5 rounded-lg hover:bg-[#4A3728]'>
                                    Contact Seller
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            {(prevPage || nextPage) && (
                <div className='flex justify-center gap-4 mt-10 pt-6 border-t border-[#C8B9A8]'>

                    <button
                        onClick={handlePrev}
                        disabled={!prevPage}
                        className='text-xs px-4 py-2 rounded-lg border border-[#C8B9A8] disabled:opacity-40'
                    >
                        ← Previous
                    </button>

                    <span className='text-[#8C7B6E] text-xs'>
                        Page {currentPage}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={!nextPage}
                        className='text-xs px-4 py-2 rounded-lg border border-[#C8B9A8] disabled:opacity-40'
                    >
                        Next →
                    </button>

                </div>
            )}

        </main>
    );
};

export default Allsell;