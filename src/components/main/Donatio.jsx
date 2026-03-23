import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Donate = () => {
  const API = import.meta.env.VITE_API_URL;
  const [books,         setBooks]         = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [currentPage,   setCurrentPage]   = useState(1)
  const [totalCount,    setTotalCount]    = useState(0)
  const [nextPage,      setNextPage]      = useState(null)
  const [prevPage,      setPrevPage]      = useState(null)

  const fetchBooks = useCallback(async (query = '', page = 1) => {
    try {
      query ? setSearchLoading(true) : setLoading(true)
      const { data } = await axios.get(`${API}/book-for-fund/`, {
        params: {
          ...(query ? { search: query } : {}),
          page,
        }
      })
      setBooks(data.results)
      setTotalCount(data.count ?? 0)
      setNextPage(data.next)
      setPrevPage(data.previous)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setSearchLoading(false)
    }
  }, [])

  // search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1)
      fetchBooks(searchQuery, 1)
    }, 500)
    return () => clearTimeout(delay)
  }, [searchQuery])

  // pagination
  useEffect(() => {
    fetchBooks(searchQuery, currentPage)
  }, [currentPage])

  const handlePrev = () => {
    if (prevPage) setCurrentPage((p) => p - 1)
  }

  const handleNext = () => {
    if (nextPage) setCurrentPage((p) => p + 1)
  }

  return (
    <main className='bg-[#F5EFE8] min-h-screen'>

      {/* Hero */}
      <section className='px-8 py-16 border-b border-[#C8B9A8] flex flex-col items-center text-center gap-4'>
        <p className='text-[#8C7B6E] text-xs tracking-widest uppercase'>Book donation</p>
        <h1 className='text-[#2C2416] text-3xl font-semibold tracking-tight leading-snug max-w-lg'>
          Give your book and a needy to be shined again
        </h1>
        <div className='flex items-center gap-3 mt-2'>
          <Link to='/donate/list/'>
            <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
              Donate a book
            </button>
          </Link>
        </div>
      </section>

      {/* Book listings */}
      <section className='px-8 py-8'>

        {/* Header */}
        <div className='mb-6 border-b border-[#C8B9A8] pb-4 flex items-center justify-between'>
          <div>
            <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Available donations</h2>
            <p className='text-[#8C7B6E] text-xs mt-0.5'>
              {searchLoading ? 'Searching...' : loading ? '...' : `${totalCount} books available for donation`}
            </p>
          </div>

          {/* Search bar */}
          <div className='flex items-center gap-2 bg-[#EDE4D8] border border-[#C8B9A8] rounded-lg px-3 py-2 focus-within:border-[#8C7B6E] transition-all duration-150'>
            <svg className='w-3.5 h-3.5 shrink-0' viewBox='0 0 16 16' fill='none' stroke='#8C7B6E' strokeWidth='1.5'>
              <circle cx='6.5' cy='6.5' r='4.5' />
              <path d='M10 10L14 14' />
            </svg>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by title or author...'
              className='bg-transparent outline-none text-xs text-[#2C2416] placeholder-[#8C7B6E] w-40'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150 text-xs'
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className='flex items-center justify-center py-20'>
            <p className='text-[#8C7B6E] text-sm animate-pulse'>Loading books...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className='flex items-center justify-center py-20'>
            <p className='text-red-400 text-sm'>Error: {error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && books.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 gap-2'>
            {searchQuery ? (
              <>
                <p className='text-[#2C2416] text-sm font-medium'>No books found</p>
                <p className='text-[#8C7B6E] text-xs'>Try a different search term</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className='mt-3 text-xs text-[#8C7B6E] hover:text-[#2C2416] underline transition-colors duration-150'
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className='text-[#2C2416] text-sm font-medium'>No books listed yet</p>
                <p className='text-[#8C7B6E] text-xs'>Be the first to donate a book</p>
                <Link to='/donate/list/'>
                  <button className='mt-3 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-2 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                    Donate now
                  </button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && books.length > 0 && (
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {books.map((book, index) => (
              <li
                key={book.id ?? index}
                className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 flex flex-col gap-3 hover:border-[#8C7B6E] hover:shadow-sm transition-all duration-150'
              >
                <div className='rounded-lg h-40 overflow-hidden border border-[#C8B9A8]'>
                  <Link to={`/donate/${book.slug}/`}>
                    {book.picture1 ? (
                      <img
                        src={book.picture1}
                        alt={book.book_name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full bg-[#D9CBBF] flex items-center justify-center'>
                        <p className='text-[#8C7B6E] text-xs'>No image</p>
                      </div>
                    )}
                  </Link>
                </div>

                <div className='flex flex-col gap-0.5'>
                  <p className='text-[#2C2416] text-sm font-semibold leading-snug line-clamp-2'>
                    {book.book_name}
                  </p>
                  <p className='text-[#8C7B6E] text-xs'>{book.author_name}</p>
                </div>

                <div className='flex items-center justify-between mt-auto pt-2.5 border-t border-[#C8B9A8]'>
                  <div className='flex flex-col gap-0'>
                    <span className='text-[#2C2416] text-sm font-semibold'>{book.donation} Taka</span>
                    <span className='text-[#8C7B6E] text-xs'>goes to education</span>
                  </div>
                  <Link to={`/donate/${book.slug}/`}>
                    <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-3 py-1.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                      Request book
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {(prevPage || nextPage) && (
          <div className='flex items-center justify-center gap-4 mt-10 pt-6 border-t border-[#C8B9A8]'>
            <button
              onClick={handlePrev}
              disabled={!prevPage}
              className='text-xs px-4 py-2 rounded-lg border border-[#C8B9A8] text-[#6B5C4E] hover:bg-[#EDE4D8] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed'
            >
              ← Previous
            </button>
            <span className='text-[#8C7B6E] text-xs'>
              Page {currentPage}
            </span>
            <button
              onClick={handleNext}
              disabled={!nextPage}
              className='text-xs px-4 py-2 rounded-lg border border-[#C8B9A8] text-[#6B5C4E] hover:bg-[#EDE4D8] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed'
            >
              Next →
            </button>
          </div>
        )}

      </section>

    </main>
  )
}

export default Donate