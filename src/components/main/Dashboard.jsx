import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-bounce">
    {message}
  </div>
)

const Dashboard = () => {
  const API = 'http://144.79.133.207:8000';
  const navigate  = useNavigate()
  const [data,       setData]       = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [activeTab,  setActiveTab]  = useState('sell')
  const [editing,    setEditing]    = useState(false)
  const [showToast,  setShowToast]  = useState(false)
  const [toastMsg,   setToastMsg]   = useState('')
  const [formData,   setFormData]   = useState({
    first_name: '', last_name: '', phone: '', address: ''
  })
  const [picture, setPicture] = useState(null)

  const token = localStorage.getItem('access')

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API}/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data)
      setFormData({
        first_name: res.data.user.first_name,
        last_name : res.data.user.last_name,
        phone     : res.data.user.phone     || '',
        address   : res.data.user.address   || '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchDashboard()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const form = new FormData()
    Object.entries(formData).forEach(([k, v]) => form.append(k, v))
    if (picture) form.append('picture', picture)

    try {
      await axios.patch('http://localhost:8000/dashboard/', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setToastMsg('Profile updated successfully!')
      setShowToast(true)
      setEditing(false)
      fetchDashboard()
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      setError('Update failed')
    }
  }

  const handleDelete = async (type, slug) => {
    const urls = {
      sell: `http://localhost:8000/book-for-sell/${slug}/`,
      fund: `http://localhost:8000/book-for-fund/${slug}/`,
      lend: `http://localhost:8000/book-for-lend/${slug}/`,
    }
    if (!window.confirm('Are you sure you want to delete this book?')) return
    try {
      await axios.delete(urls[type], {
        headers: { Authorization: `Bearer ${token}` }
      })
      setToastMsg('Book deleted successfully!')
      setShowToast(true)
      fetchDashboard()
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      setError('Delete failed')
    }
  }

  if (loading) return (
    <div className='min-h-screen bg-[#F5EFE8] flex items-center justify-center'>
      <p className='text-[#8C7B6E] text-sm animate-pulse'>Loading dashboard...</p>
    </div>
  )

  if (error) return (
    <div className='min-h-screen bg-[#F5EFE8] flex items-center justify-center'>
      <p className='text-red-400 text-sm'>Error: {error}</p>
    </div>
  )

  const tabs = [
    { key: 'sell', label: 'Selling',   count: data.sell_books.length },
    { key: 'fund', label: 'Donating',  count: data.fund_books.length },
    { key: 'lend', label: 'Lending',   count: data.lend_books.length },
  ]

  const activeBooks = {
    sell: data.sell_books,
    fund: data.fund_books,
    lend: data.lend_books,
  }[activeTab]

  const editLinks = {
    sell: (slug) => `/book-for-sell/${slug}/edit/`,
    fund: (slug) => `/donate/${slug}/edit/`,
    lend: (slug) => `/library/${slug}/edit/`,
  }

  return (
    <main className='bg-[#F5EFE8] min-h-screen px-8 py-8'>

      {/* Header */}
      <div className='mb-8 border-b border-[#C8B9A8] pb-4'>
        <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Dashboard</h2>
        <p className='text-[#8C7B6E] text-xs mt-0.5'>Manage your profile and listings</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>

        {/* Left — user info */}
        <div className='lg:w-64 shrink-0'>
          <div className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-5 flex flex-col gap-4 sticky top-24'>

            {/* Avatar */}
            <div className='flex flex-col items-center gap-3 border-b border-[#C8B9A8] pb-4'>
              {data.user.picture ? (
                <img
                  src={data.user.picture}
                  alt={data.user.first_name}
                  className='w-16 h-16 rounded-full object-cover border border-[#C8B9A8]'
                />
              ) : (
                <div className='w-16 h-16 rounded-full bg-[#C8B9A8]' />
              )}
              <div className='text-center'>
                <p className='text-[#2C2416] text-sm font-semibold'>
                  {data.user.first_name} {data.user.last_name}
                </p>
                <p className='text-[#8C7B6E] text-xs'>{data.user.email}</p>
              </div>
            </div>

            {/* Info */}
            {!editing ? (
              <div className='flex flex-col gap-3'>
                {data.user.phone && (
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-[#8C7B6E] text-xs'>Phone</p>
                    <p className='text-[#2C2416] text-xs font-medium'>{data.user.phone}</p>
                  </div>
                )}
                {data.user.address && (
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-[#8C7B6E] text-xs'>Address</p>
                    <p className='text-[#2C2416] text-xs font-medium'>{data.user.address}</p>
                  </div>
                )}
                <button
                  onClick={() => setEditing(true)}
                  className='w-full border border-[#C8B9A8] text-[#2C2416] text-xs px-3 py-2 rounded-lg hover:bg-[#D9CBBF] transition-colors duration-150'
                >
                  Edit profile
                </button>
              </div>
            ) : (
              /* Edit form */
              <div className='flex flex-col gap-3'>
                {[
                  { name: 'first_name', placeholder: 'First name' },
                  { name: 'last_name',  placeholder: 'Last name'  },
                  { name: 'phone',      placeholder: 'Phone'      },
                  { name: 'address',    placeholder: 'Address'    },
                ].map((field) => (
                  <input
                    key={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder={field.placeholder}
                    className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-xs text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                  />
                ))}
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => setPicture(e.target.files[0])}
                  className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-1.5 text-xs text-[#8C7B6E] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-[#2C2416] file:text-[#EDE4D8] cursor-pointer'
                />
                <div className='flex gap-2'>
                  <button
                    onClick={handleUpdate}
                    className='flex-1 bg-[#2C2416] text-[#EDE4D8] text-xs py-2 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className='flex-1 border border-[#C8B9A8] text-[#2C2416] text-xs py-2 rounded-lg hover:bg-[#D9CBBF] transition-colors duration-150'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right — book listings */}
        <div className='flex-1'>

          {/* Tabs */}
          <div className='flex gap-2 mb-6 border-b border-[#C8B9A8] pb-4'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs px-4 py-2 rounded-lg transition-colors duration-150 ${
                  activeTab === tab.key
                    ? 'bg-[#2C2416] text-[#EDE4D8]'
                    : 'text-[#6B5C4E] hover:bg-[#D9CBBF]'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-[#C8B9A8]' : 'text-[#8C7B6E]'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Empty */}
          {activeBooks.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 gap-2'>
              <p className='text-[#2C2416] text-sm font-medium'>No books listed yet</p>
              <p className='text-[#8C7B6E] text-xs'>
                {activeTab === 'sell' && 'List a book for sale'}
                {activeTab === 'fund' && 'Donate a book'}
                {activeTab === 'lend' && 'Lend a book'}
              </p>
            </div>
          )}

          {/* Grid */}
          {activeBooks.length > 0 && (
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {activeBooks.map((book, index) => (
                <li
                  key={book.id ?? index}
                  className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 flex flex-col gap-3'
                >
                  {/* Image */}
                  <div className='rounded-lg h-36 overflow-hidden border border-[#C8B9A8]'>
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
                  </div>

                  {/* Info */}
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-[#2C2416] text-sm font-semibold leading-snug line-clamp-1'>
                      {book.book_name}
                    </p>
                    <p className='text-[#8C7B6E] text-xs'>{book.author_name}</p>
                    {activeTab === 'sell' && (
                      <p className='text-[#2C2416] text-xs font-medium mt-1'>{book.price} Taka</p>
                    )}
                    {activeTab === 'fund' && (
                      <p className='text-[#2C2416] text-xs font-medium mt-1'>{book.donation} Taka donation</p>
                    )}
                    {activeTab === 'lend' && (
                      <p className='text-[#2C2416] text-xs font-medium mt-1'>{book.duration} days</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2 mt-auto pt-2.5 border-t border-[#C8B9A8]'>
                    <button
                      onClick={() => handleDelete(activeTab, book.slug)}
                      className='flex-1 border border-red-200 text-red-400 text-xs py-1.5 rounded-lg hover:bg-red-50 transition-colors duration-150'
                    >
                      Delete
                    </button>
                  </div>

                </li>
              ))}
            </ul>
          )}

        </div>
      </div>

      {showToast && <Toast message={toastMsg} />}

    </main>
  )
}

export default Dashboard