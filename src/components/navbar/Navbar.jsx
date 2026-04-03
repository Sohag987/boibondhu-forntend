import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const token    = localStorage.getItem('access');
  const username = localStorage.getItem('username');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <div>
      <nav className='sticky top-0 z-50 bg-[#EDE4D8] border-b border-[#C8B9A8]'>

        {/* Main bar */}
        <div className='flex justify-between items-center px-8 py-3.5'>

          {/* Logo */}
          <Link to="/">
            <span className='text-[#2C2416] font-semibold text-base tracking-tight'>BOI
              <span className='text-[#298b8c] font-semibold text-base tracking-tight'>BONDHU</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className='hidden md:flex items-center gap-1 text-sm text-[#6B5C4E]'>
            <Link to="/"><li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Home</li></Link>
            <Link to="/about/"><li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>About</li></Link>
            <Link to="/contact/">
            <li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Contact</li>
            </Link>
            
            
            <Link to="/book-for-sell/"><li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Buy</li></Link>
            <Link to="/sell/"><li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Sell</li></Link>
            <Link to="/library/"><li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Library</li></Link>
            <Link to='/donate/'>
            <li className='cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Donate</li>
            </Link>
          </ul>

          {/* Desktop Auth */}
          <div className='hidden md:flex items-center gap-2'>
            {token ? (
              <>
                <Link to="/dashboard/"><span className='text-[#2C2416] text-xs font-medium px-3 py-1.5 bg-[#D9CBBF] border border-[#C8B9A8] rounded-lg'>
                  {username}
                </span></Link>
                <button
                  onClick={handleLogout}
                  className='text-xs text-[#8C7B6E] px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login/">
                  <button className='text-xs text-[#6B5C4E] px-3 py-1.5 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>
                    Log in
                  </button>
                </Link>
                <Link to="/signup/">
                  <button className='text-xs bg-[#2C2416] text-[#EDE4D8] px-3 py-1.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger button */}
          <button
            className='md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#D9CBBF] transition-colors duration-150'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-[#2C2416] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#2C2416] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#2C2416] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className='md:hidden border-t border-[#C8B9A8] px-6 py-4 flex flex-col gap-1 text-sm text-[#6B5C4E]'>

            <Link to="/" onClick={() => setMenuOpen(false)}>
              <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Home</p>
            </Link>
            <Link to ='/about/' onClick={() => setMenuOpen(false)}>
            <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 cursor-pointer'>About</p>
            </Link> 
            <Link to ="/contact/" onClick={() => setMenuOpen(false)}>
            <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 cursor-pointer'>Contact</p>
            </Link>
            <Link to ="/library/" onClick={() => setMenuOpen(false)}>
            <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 cursor-pointer'>Library</p>
            
            </Link>
            <Link to="/book-for-sell/" onClick={() => setMenuOpen(false)}>
              <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Buy</p>
            </Link>
            <Link to="/sell/" onClick={() => setMenuOpen(false)}>
              <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150'>Sell</p>
            </Link>
            <Link to="/donate" onClick={() => setMenuOpen(false)}>
            <p className='px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 cursor-pointer'>Donate</p>
            </Link>

            {/* Mobile Auth */}
            <div className='flex flex-col gap-2 mt-3 pt-3 border-t border-[#C8B9A8]'>
              {token ? (
                <>
                  <Link to="/dashboard/" onClick={() => setMenuOpen(false)}>
                  <span className='text-[#2C2416] text-xs font-medium px-3 py-1.5 bg-[#D9CBBF] border border-[#C8B9A8] rounded-lg text-center'>
                    {username}
                  </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='text-xs text-[#8C7B6E] px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 text-left'
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login/" onClick={() => setMenuOpen(false)}>
                    <button className='w-full text-xs text-[#6B5C4E] px-3 py-2 rounded-lg hover:bg-[#D9CBBF] hover:text-[#2C2416] transition-all duration-150 text-left'>
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <button className='w-full text-xs bg-[#2C2416] text-[#EDE4D8] px-3 py-2 rounded-lg hover:bg-[#4A3728] transition-colors duration-150'>
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>

          </div>
        )}

      </nav>
    </div>
  )
}

export default Navbar