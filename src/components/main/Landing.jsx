import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Buy',
    description: 'Browse thousands of second-hand books at affordable prices. Find your next read today.',
    link: '/book-for-sell/',
    label: 'Browse books',
  },
  {
    title: 'Sell',
    description: 'Have books collecting dust? List them for sale and earn from your old collection.',
    link: '/sell/',
    label: 'Start selling',
  },
  {
    title: 'Donate',
    description: 'Give your books a second life. Donate to readers who need them most.',
    link: '/donate/',
    label: 'Donate now',
  },
  {
    title: 'Library',
    description: 'Lend your books or borrow from others. A community-driven lending system.',
    link: '/library/',
    label: 'Visit library',
  },
]

const Landing = () => {
  return (
    <main className='bg-[#F5EFE8] min-h-screen'>

      {/* Hero */}
      <section className='px-8 py-20 flex flex-col items-center text-center gap-4 border-b border-[#C8B9A8]'>
        <p className='text-[#8C7B6E] text-xs tracking-widest uppercase'>Bangladesh's book community</p>
        <h1 className='text-[#2C2416] text-3xl font-semibold tracking-tight leading-snug max-w-md'>
          Buy, sell, donate and borrow books — all in one place.
        </h1>
        <p className='text-[#8C7B6E] text-sm max-w-sm leading-relaxed'>
          BoiBondhu connects book lovers across Bangladesh. Find affordable reads or give your books a second life.
        </p>
        <div className='flex items-center gap-3 mt-2'>
          <Link to='/book-for-sell/'>
            <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
              Explore books
            </button>
          </Link>
          <Link to='/signup'>
            <button className='bg-transparent text-[#2C2416] text-xs px-5 py-2.5 rounded-lg border border-[#C8B9A8] hover:bg-[#EDE4D8] transition-colors duration-150'>
              Join for free
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className='px-8 py-12'>
        <div className='mb-8 border-b border-[#C8B9A8] pb-4'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>What you can do</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>Four ways to be part of the community</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-5 flex flex-col gap-3 hover:border-[#8C7B6E] hover:shadow-sm transition-all duration-150'
            >
              <h3 className='text-[#2C2416] text-base font-semibold'>{feature.title}</h3>
              <p className='text-[#8C7B6E] text-xs leading-relaxed flex-1'>{feature.description}</p>
              <Link to={feature.link}>
                <button className='w-full bg-[#2C2416] text-[#EDE4D8] text-xs px-3 py-1.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                  {feature.label}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className='px-8 py-10 border-t border-[#C8B9A8]'>
        <div className='flex flex-wrap justify-center gap-12'>
          {[
            { value: '0', label: 'Books listed' },
            { value: '0', label: 'Happy readers' },
            { value: '0', label: 'Books donated' },
            { value: '0', label: 'Books borrowed' },
          ].map((stat) => (
            <div key={stat.label} className='flex flex-col items-center gap-1'>
              <span className='text-[#2C2416] text-2xl font-semibold'>{stat.value}</span>
              <span className='text-[#8C7B6E] text-xs'>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='px-8 py-14 border-t border-[#C8B9A8] flex flex-col items-center text-center gap-4'>
        <h2 className='text-[#2C2416] text-xl font-semibold tracking-tight'>Ready to get started?</h2>
        <p className='text-[#8C7B6E] text-sm max-w-xs leading-relaxed'>
          Join thousands of book lovers already using BoiBondhu.
        </p>
        <Link to='/signup'>
          <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-6 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
            Create free account
          </button>
        </Link>
      </section>

    </main>
  )
}

export default Landing