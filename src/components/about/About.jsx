import React from 'react'
import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Affordable reading',
    description: 'We believe every student and reader deserves access to books without breaking the bank.',
  },
  {
    title: 'Community first',
    description: 'BoiBondhu is built by book lovers, for book lovers. Every feature exists to bring readers closer.',
  },
  {
    title: 'Reduce waste',
    description: 'A book sitting on a shelf unread is a wasted resource. We help books find new homes.',
  },
  {
    title: 'Knowledge for all',
    description: 'Through our donate and library features, we make sure cost is never a barrier to learning.',
  },
]

const team = [
  { name: 'Sohag Mondal',   role: 'Founder&CEO' },
  { name: 'Md Jibon Seikh',  role: 'Community Manager'   },
  { name: 'Neloy Nandi', role: 'Design Lead'},
]

const About = () => {
  return (
    <main className='bg-[#F5EFE8] min-h-screen'>

      {/* Hero */}
      <section className='px-8 py-16 border-b border-[#C8B9A8]'>
        <div className='max-w-2xl'>
          <p className='text-[#8C7B6E] text-xs tracking-widest uppercase mb-3'>About BoiBondhu</p>
          <h1 className='text-[#2C2416] text-3xl font-semibold tracking-tight leading-snug mb-4'>
            Connecting book lovers across Bangladesh
          </h1>
          <p className='text-[#5A4A3A] text-sm leading-relaxed'>
            BoiBondhu was born from a simple idea — books should be shared, not hoarded.
            Millions of books sit unused on shelves across Bangladesh while thousands of
            students and readers cannot afford the ones they need. We built BoiBondhu to
            fix that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='max-w-2xl'>
          <div className='mb-6 pb-4 border-b border-[#C8B9A8]'>
            <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>Our mission</h2>
          </div>
          <div className='flex flex-col gap-6'>
            <p className='text-[#5A4A3A] text-sm leading-relaxed'>
              Our mission is to create a sustainable book ecosystem in Bangladesh where
              anyone can buy, sell, donate, or borrow books with ease. We want to make
              reading accessible to every person regardless of their financial situation.
            </p>
            <p className='text-[#5A4A3A] text-sm leading-relaxed'>
              Whether you are a student looking for affordable textbooks, a reader wanting
              to declutter your shelf, or someone who simply wants to share the joy of
              reading — BoiBondhu is your platform.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='mb-6 pb-4 border-b border-[#C8B9A8]'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>What we stand for</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>The values that guide everything we build</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {values.map((value) => (
            <div
              key={value.title}
              className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-5 flex flex-col gap-2 hover:border-[#8C7B6E] transition-all duration-150'
            >
              <h3 className='text-[#2C2416] text-sm font-semibold'>{value.title}</h3>
              <p className='text-[#8C7B6E] text-xs leading-relaxed'>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='mb-6 pb-4 border-b border-[#C8B9A8]'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>How it works</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>Four simple ways to participate</p>
        </div>
        <div className='flex flex-col gap-4 max-w-xl'>
          {[
            { step: '01', title: 'Buy',     desc: 'Browse listed books and purchase directly from sellers near you.' },
            { step: '02', title: 'Sell',    desc: 'List your old books in minutes and connect with interested buyers.' },
            { step: '03', title: 'Donate',  desc: 'Give away books you no longer need to readers who will love them.' },
            { step: '04', title: 'Library', desc: 'Lend your books for a set period or borrow from community members.' },
          ].map((item) => (
            <div key={item.step} className='flex gap-4 items-start'>
              <span className='text-[#C8B9A8] text-xs font-semibold pt-0.5 w-6 shrink-0'>{item.step}</span>
              <div className='flex flex-col gap-0.5 border-b border-[#C8B9A8] pb-4 flex-1'>
                <p className='text-[#2C2416] text-sm font-semibold'>{item.title}</p>
                <p className='text-[#8C7B6E] text-xs leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className='px-8 py-12 border-b border-[#C8B9A8]'>
        <div className='mb-6 pb-4 border-b border-[#C8B9A8]'>
          <h2 className='text-[#2C2416] text-lg font-semibold tracking-tight'>The team</h2>
          <p className='text-[#8C7B6E] text-xs mt-0.5'>The people behind BoiBondhu</p>
        </div>
        <div className='flex flex-wrap gap-4'>
          {team.map((member) => (
            <div
              key={member.name}
              className='bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl px-5 py-4 flex flex-col gap-1 hover:border-[#8C7B6E] transition-all duration-150'
            >
              <div className='w-8 h-8 rounded-full bg-[#C8B9A8] mb-1' />
              <p className='text-[#2C2416] text-sm font-semibold'>{member.name}</p>
              <p className='text-[#8C7B6E] text-xs'>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='px-8 py-14 flex flex-col items-center text-center gap-4'>
        <h2 className='text-[#2C2416] text-xl font-semibold tracking-tight'>Join the community</h2>
        <p className='text-[#8C7B6E] text-sm max-w-xs leading-relaxed'>
          Thousands of book lovers are already part of BoiBondhu. Come be one of them.
        </p>
        <div className='flex items-center gap-3'>
          <Link to='/signup'>
            <button className='bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
              Get started
            </button>
          </Link>
          <Link to='/book-for-sell/'>
            <button className='text-xs text-[#6B5C4E] px-5 py-2.5 rounded-lg border border-[#C8B9A8] hover:bg-[#EDE4D8] transition-colors duration-150'>
              Browse books
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default About