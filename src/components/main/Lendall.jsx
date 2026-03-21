import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const howItWorks = [
  {
    step: '01',
    title: 'Lend your book',
    desc:  'List a book you own and set how long you are willing to lend it.',
  },
  {
    step: '02',
    title: 'Find a book',
    desc:  'Browse thousands of books listed by community members.',
  },
  {
    step: '03',
    title: 'Connect and exchange',
    desc:  'Contact the lender via WhatsApp or email and arrange handover.',
  },
  {
    step: '04',
    title: 'Return and repeat',
    desc:  'Return the book after the agreed period and build trust.',
  },
]

const Library = () => {
 

  return (
    <main className='bg-[#F5EFE8] min-h-screen'>

      {/* Hero */}
      <section className='px-8 py-16 border-b border-[#C8B9A8]'>
        <div className='max-w-2xl'>
          <p className='text-[#8C7B6E] text-xs tracking-widest uppercase mb-3'>
            BoiBondhu Library
          </p>
          <h1 className='text-[#2C2416] text-3xl font-semibold tracking-tight leading-snug mb-4'>
            Bangladesh's first virtual library of physical books
          </h1>
          <p className='text-[#5A4A3A] text-sm leading-relaxed mb-6'>
            No building. No membership fee. No waiting in line. Just people sharing
            books with each other across Bangladesh. Lend a book from your shelf,
            borrow one from someone across town. A library without walls.
          </p>
          <div className='flex items-center gap-3'>
            <Link to='/library/lend/'>
              <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                Lend a book
              </button>
            </Link>
            <Link to='/library/borrow/'>
              <button className='text-xs text-[#6B5C4E] px-5 py-2.5 rounded-lg border border-[#C8B9A8] hover:bg-[#EDE4D8] transition-colors duration-150'>
                Borrow a book
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='mb-6 border-b border-[#C8B9A8] pb-4'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Our vision</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>Why we built this</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl'>
          {[
            {
              title: 'No physical walls',
              desc:  'Traditional libraries require buildings and geography. Ours exists wherever there are readers.',
            },
            {
              title: 'Community powered',
              desc:  'Every book is owned by a real person who chose to share it. The community is the library.',
            },
            {
              title: 'Free to borrow',
              desc:  'Borrowing is always free. No fees, no subscriptions, no barriers.',
            },
            {
              title: 'Across Bangladesh',
              desc:  'From Dhaka to Dinajpur — if someone has a book and someone needs it, we connect them.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-5 flex flex-col gap-2 hover:border-[#8C7B6E] transition-all duration-150'
            >
              <h3 className='text-[#2C2416] text-sm font-semibold'>{item.title}</h3>
              <p className='text-[#8C7B6E] text-xs leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='mb-6 border-b border-[#C8B9A8] pb-4'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>How it works</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>Four simple steps</p>
        </div>
        <div className='flex flex-col gap-4 max-w-xl'>
          {howItWorks.map((item) => (
            <div key={item.step} className='flex gap-4 items-start'>
              <span className='text-[#C8B9A8] text-xs font-semibold pt-0.5 w-6 shrink-0'>
                {item.step}
              </span>
              <div className='flex flex-col gap-0.5 border-b border-[#C8B9A8] pb-4 flex-1'>
                <p className='text-[#2C2416] text-sm font-semibold'>{item.title}</p>
                <p className='text-[#8C7B6E] text-xs leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      <section className='px-8 py-14 border-t border-[#C8B9A8] flex flex-col items-center text-center gap-4'>
        <h2 className='text-[#2C2416] text-xl font-semibold tracking-tight'>
          Have books sitting on your shelf?
        </h2>
        <p className='text-[#8C7B6E] text-sm max-w-xs leading-relaxed'>
          List them in our library. Someone nearby might be looking for exactly that book.
        </p>
        <Link to='/library/lend/'>
          <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-6 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
            Lend a book
          </button>
        </Link>
      </section>

    </main>
  )
}

export default Library