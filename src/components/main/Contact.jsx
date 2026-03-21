import React, { useState } from 'react'
import axios from 'axios'

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-bounce">
    {message}
  </div>
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [loading,   setLoading]   = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error,     setError]     = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.post('http://127.0.0.1:8000/contact/', formData)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='bg-[#F5EFE8] min-h-screen px-8 py-8'>

      {/* Header */}
      <div className='mb-8 border-b border-[#C8B9A8] pb-4'>
        <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Contact us</h2>
        <p className='text-[#8C7B6E] text-xs mt-0.5'>We would love to hear from you</p>
      </div>

      <div className='max-w-3xl mx-auto flex flex-col lg:flex-row gap-8'>

        {/* Left — info */}
        <div className='flex flex-col gap-4 lg:w-64 shrink-0'>
          {[
            { title: 'Email',    value: 'hello@boibondhu.com', sub: 'We reply within 24 hours'    },
            { title: 'WhatsApp', value: '+880 1XXX-XXXXXX',    sub: 'Sat – Thu, 9am – 6pm'        },
            { title: 'Location', value: 'Dhaka, Bangladesh',   sub: 'Serving readers nationwide'  },
          ].map((info) => (
            <div key={info.title} className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 flex flex-col gap-1'>
              <p className='text-[#8C7B6E] text-xs'>{info.title}</p>
              <p className='text-[#2C2416] text-sm font-semibold'>{info.value}</p>
              <p className='text-[#8C7B6E] text-xs'>{info.sub}</p>
            </div>
          ))}

          {/* Social */}
          <div className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-4 flex flex-col gap-3'>
            <p className='text-[#2C2416] text-xs font-semibold'>Follow us</p>
            <div className='flex items-center gap-3'>
              <a href='https://facebook.com' target='_blank' rel='noreferrer'
                className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href='https://instagram.com' target='_blank' rel='noreferrer'
                className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href='https://wa.me/8801XXXXXXXXX' target='_blank' rel='noreferrer'
                className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.643a.75.75 0 0 0 .916.916l5.813-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.867 0-3.617-.484-5.134-1.332l-.36-.208-3.742.944.962-3.617-.229-.373A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className='flex-1'>
          <div className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-6 flex flex-col gap-4'>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-xs'>
                {typeof error === 'string' ? error : 'Something went wrong.'}
              </div>
            )}

            <div className='flex flex-col sm:flex-row gap-3'>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#2C2416] text-xs font-medium'>Name</label>
                <input
                  name='name' value={formData.name} onChange={handleChange}
                  placeholder='Rahim Khan'
                  className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                />
              </div>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#2C2416] text-xs font-medium'>Email</label>
                <input
                  name='email' type='email' value={formData.email} onChange={handleChange}
                  placeholder='rahim@example.com'
                  className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
                />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[#2C2416] text-xs font-medium'>Subject</label>
              <input
                name='subject' value={formData.subject} onChange={handleChange}
                placeholder='How can we help?'
                className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[#2C2416] text-xs font-medium'>Message</label>
              <textarea
                name='message' value={formData.message} onChange={handleChange}
                rows={5} placeholder='Write your message here...'
                className='bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150 resize-none'
              />
            </div>

            <button
              onClick={handleSubmit} disabled={loading}
              className='mt-2 bg-[#2C2416] text-[#EDE4D8] text-sm px-4 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>

          </div>
        </div>
      </div>

      {showToast && <Toast message="Message sent! We will get back to you soon." />}

    </main>
  )
}

export default Contact