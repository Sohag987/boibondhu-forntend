import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Toast = ({ message }) => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-bounce">
        {message}
    </div>
)

const DonateForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        book_name: '',
        author_name: '',
        donation: '',
    })
    const [picture1, setPicture1] = useState(null)
    const [picture2, setPicture2] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }

        const data = new FormData()
        Object.entries(formData).forEach(([key, val]) => data.append(key, val))
        if (picture1) data.append('picture1', picture1)
        if (picture2) data.append('picture2', picture2)

        for (let [key, val] of data.entries()) {
            console.log(key, val)
        }

        try {
            await axios.post('http://localhost:8000/book-for-fund/', data, {
                headers: {

                    'Authorization': `Bearer ${token}`,
                },
            })
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                navigate('/donate/')
            }, 2000)
        } catch (err) {
            setError(err.response?.data || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='min-h-screen bg-[#F5EFE8] px-8 py-8'>

            {/* Header */}
            <div className='mb-8 border-b border-[#C8B9A8] pb-4'>
                <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Donate a book</h2>
                <p className='text-[#8C7B6E] text-xs mt-0.5'>
                    List your book and set a small donation amount for street children's education
                </p>
            </div>

            {/* Info banner */}
            <div className='max-w-xl mx-auto mb-6 bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl px-5 py-4 flex flex-col gap-1'>
                <p className='text-[#2C2416] text-xs font-semibold'>How the donation works</p>
                <p className='text-[#8C7B6E] text-xs leading-relaxed'>
                    The person who takes your book will pay a small amount you set below.
                    That money goes directly towards educating street children in Bangladesh.
                    Your book gets a new reader, a child gets an education.
                </p>
            </div>

            <div className='max-w-xl mx-auto'>
                <div className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-6 flex flex-col gap-4'>

                    {/* Error */}
                    {error && (
                        <div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-xs'>
                            {typeof error === 'string'
                                ? error
                                : Object.entries(error).map(([k, v]) => (
                                    <p key={k}><span className='font-medium'>{k}:</span> {v}</p>
                                ))}
                        </div>
                    )}

                    {/* Book name */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-[#2C2416] text-xs font-medium'>Book name</label>
                        <input
                            name='book_name'
                            value={formData.book_name}
                            onChange={handleChange}
                            placeholder='e.g. Pather Panchali'
                            className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                        />
                    </div>

                    {/* Author */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-[#2C2416] text-xs font-medium'>Author name</label>
                        <input
                            name='author_name'
                            value={formData.author_name}
                            onChange={handleChange}
                            placeholder='e.g. Bibhutibhushan'
                            className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                        />
                    </div>

                    {/* Donation amount */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-[#2C2416] text-xs font-medium'>Donation amount (Taka)</label>
                        <input
                            name='donation'
                            type='number'
                            value={formData.donation}
                            onChange={handleChange}
                            placeholder='e.g. 20'
                            className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                        />
                        <p className='text-[#8C7B6E] text-xs mt-0.5'>
                            Minimum 20 Taka — this goes to street children's education fund
                        </p>
                    </div>

                    {/* Pictures */}
                    {/* Pictures */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[#2C2416] text-xs font-medium'>
                            Pictures <span className='text-[#8C7B6E] font-normal'>(up to 2)</span>
                        </label>

                        <div className='flex items-center gap-2'>
                            <span className='text-[#8C7B6E] text-xs w-16'>Picture 1</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setPicture1(e.target.files[0])}
                                className='flex-1 bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-1.5 text-xs text-[#8C7B6E] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#2C2416] file:text-[#EDE4D8] hover:file:bg-[#4A3728] transition-colors duration-150 cursor-pointer'
                            />
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='text-[#8C7B6E] text-xs w-16'>Picture 2</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setPicture2(e.target.files[0])}
                                className='flex-1 bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-1.5 text-xs text-[#8C7B6E] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#2C2416] file:text-[#EDE4D8] hover:file:bg-[#4A3728] transition-colors duration-150 cursor-pointer'
                            />
                        </div>

                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className='mt-2 bg-[#2C2416] text-[#EDE4D8] text-sm px-4 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Listing book...' : 'List for donation'}
                    </button>

                </div>
            </div>

            {showToast && <Toast message="Book listed for donation successfully!" />}

        </main>
    )
}

export default DonateForm