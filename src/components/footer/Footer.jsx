import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-[#EDE4D8] border-t border-[#C8B9A8] px-8 py-10'>

            <div className='flex flex-col sm:flex-row justify-between gap-8'>

                {/* Brand */}
                <div className='flex flex-col gap-2 max-w-xs'>
                    <span className='text-[#2C2416] font-semibold text-base tracking-tight'>
                        BOI<span className='text-[#298b8c]'>BONDHU</span>
                    </span>
                    <p className='text-[#8C7B6E] text-xs leading-relaxed'>
                        Bangladesh's community platform for buying, selling, donating and borrowing books.
                    </p>
                </div>
                {/* Social icons — brand div-এর ভেতরে, description-এর পরে */}
                <div className='flex items-center gap-3 mt-2'>
                    <a href='https://www.facebook.com/profile.php?id=61575361655558' target='_blank' rel='noreferrer'
                        className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a href='https://www.instagram.com/boibondhu999/' target='_blank' rel='noreferrer'
                        className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    <a href='https://wa.me/8801575822635' target='_blank' rel='noreferrer'
                        className='text-[#8C7B6E] hover:text-[#2C2416] transition-colors duration-150'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.643a.75.75 0 0 0 .916.916l5.813-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.867 0-3.617-.484-5.134-1.332l-.36-.208-3.742.944.962-3.617-.229-.373A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                    </a>
                </div>



                {/* Links */}
                <div className='flex flex-wrap gap-12'>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[#2C2416] text-xs font-semibold'>Features</p>
                        {[
                            { label: 'Buy', to: '/book-for-sell/' },
                            { label: 'Sell', to: '/sell/' },
                            { label: 'Donate', to: '/donate/' },
                            { label: 'Library', to: '/library/' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className='text-[#8C7B6E] text-xs hover:text-[#2C2416] transition-colors duration-150'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[#2C2416] text-xs font-semibold'>Company</p>
                        {[
                            { label: 'About', to: '/about/' },
                            { label: 'Contact', to: '/contact/' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className='text-[#8C7B6E] text-xs hover:text-[#2C2416] transition-colors duration-150'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[#2C2416] text-xs font-semibold'>Account</p>
                        {[
                            { label: 'Log in', to: '/login/' },
                            { label: 'Sign up', to: '/signup/' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className='text-[#8C7B6E] text-xs hover:text-[#2C2416] transition-colors duration-150'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                </div>

            </div>

            {/* Bottom bar */}
            <div className='mt-10 pt-4 border-t border-[#C8B9A8] flex flex-col sm:flex-row items-center justify-between gap-2'>
                <p className='text-[#8C7B6E] text-xs'>
                    © {new Date().getFullYear()} BoiBondhu. All rights reserved.
                </p>
                <p className='text-[#C8B9A8] text-xs'>
                    Made with love for book lovers in Bangladesh
                </p>
            </div>

        </footer>
    )
}

export default Footer 