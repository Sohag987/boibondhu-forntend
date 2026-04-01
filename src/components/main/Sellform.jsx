import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-[slideDown_0.3s_ease-out]">
    {message}
  </div>
);

const SellForm = () => {
  const API = 'http://144.79.133.207:8000';
  const navigate  = useNavigate();
  const [formData, setFormData] = useState({
    book_name  : '',
    author_name: '',
    description: '',
    price      : '',
  });
  const [picture1, setPicture1] = useState(null);
  const [picture2, setPicture2] = useState(null);
  const [picture3, setPicture3] = useState(null);
  const [error,     setError]     = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (pictureNumber, file) => {
    if (pictureNumber === 1) {
      setPicture1(file);
    } else if (pictureNumber === 2) {
      setPicture2(file);
    } else if (pictureNumber === 3) {
      setPicture3(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (picture1) data.append('picture1', picture1);
    if (picture2) data.append('picture2', picture2);
    if (picture3) data.append('picture3', picture3);

    try {
      await axios.post(`${API}/book-for-sell/`, data, {
        headers: {
          'Content-Type'  : 'multipart/form-data',
          'Authorization' : `Bearer ${token}`,
        },
      });

      setShowToast(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/book-for-sell/');
      }, 2000);

    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
      setLoading(false);
      setShowToast(false);
    }
  };

  const pictures = [
    { number: 1, label: 'Picture 1', state: picture1, setter: setPicture1 },
    { number: 2, label: 'Picture 2', state: picture2, setter: setPicture2 },
    { number: 3, label: 'Picture 3', state: picture3, setter: setPicture3 },
  ];

  return (
    <main className='min-h-screen bg-[#F5EFE8] px-4 sm:px-8 py-8'>

      {showToast && <Toast message="Book listed successfully! Redirecting..." />}

      {/* Header */}
      <div className='mb-6 border-b border-[#C8B9A8] pb-4'>
        <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>List a book</h2>
        <p className='text-[#8C7B6E] text-xs mt-0.5'>Fill in the details to list your book for sale</p>
      </div>

      <div className='max-w-xl mx-auto'>
        <div className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 sm:p-6 flex flex-col gap-4'>

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

          {/* Price */}
          <div className='flex flex-col gap-1'>
            <label className='text-[#2C2416] text-xs font-medium'>Price (Taka)</label>
            <input
              name='price'
              type='number'
              value={formData.price}
              onChange={handleChange}
              placeholder='e.g. 150'
              className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1'>
            <label className='text-[#2C2416] text-xs font-medium'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder='Describe the book condition, edition, etc.'
              className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150 resize-none'
            />
          </div>

          {/* Pictures - Mobile Responsive */}
          <div className='flex flex-col gap-3'>
            <label className='text-[#2C2416] text-xs font-medium'>
              Pictures <span className='text-[#8C7B6E] font-normal'>(up to 3)</span>
            </label>

            {pictures.map((pic) => (
              <div key={pic.label} className='flex flex-col gap-1'>
                <span className='text-[#8C7B6E] text-xs'>{pic.label}</span>
                <div className='relative'>
                  <input
                    type='file'
                    id={`picture${pic.number}-upload`}
                    accept='image/*'
                    onChange={(e) => handleFileChange(pic.number, e.target.files[0])}
                    className='hidden'
                  />
                  <label
                    htmlFor={`picture${pic.number}-upload`}
                    className='flex items-center justify-between bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 cursor-pointer hover:border-[#8C7B6E] transition-colors duration-150'
                  >
                    <span className='text-sm text-[#8C7B6E] truncate pr-2'>
                      {pic.state ? pic.state.name : 'Choose a file'}
                    </span>
                    <span className='flex-shrink-0 bg-[#2C2416] text-[#EDE4D8] text-xs px-3 py-1.5 rounded-md hover:bg-[#4A3728] transition-colors duration-150'>
                      Browse
                    </span>
                  </label>
                </div>
                {pic.state && (
                  <div className='flex items-center justify-between mt-1 text-xs text-[#8C7B6E]'>
                    <span className='truncate'>{pic.state.name}</span>
                    <button
                      type='button'
                      onClick={() => pic.setter(null)}
                      className='ml-2 text-red-600 hover:text-red-700 flex-shrink-0'
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className='mt-2 bg-[#2C2416] text-[#EDE4D8] text-sm px-4 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Listing book...' : 'List book for sale'}
          </button>

        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>

    </main>
  );
};

export default SellForm;