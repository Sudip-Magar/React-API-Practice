import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Room from '../Pages/Room/Room'
import Contact from '../Pages/Contact'
import About from '../Pages/About'
import RoomDetail from '../Pages/Room/RoomDetail'
import Booking from '../Component/Booking'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <div className='bg-emerald-600 sticky top-0 z-50 shadow-md'>
                <header className='flex justify-between items-center px-4 md:px-10 py-3 text-white max-w-7xl mx-auto'>

                    {/* Logo */}
                    <div className='text-lg font-semibold'>
                        Hotel Booking
                    </div>

                    {/* Desktop Menu */}
                    <nav className='hidden md:block'>
                        <ul className='flex gap-8 font-medium'>
                            <li><Link className='hover:text-gray-200 transition' to="/">Home</Link></li>
                            <li><Link className='hover:text-gray-200 transition' to="/contact">Contact</Link></li>
                            <li><Link className='hover:text-gray-200 transition' to="/about">About</Link></li>
                        </ul>
                    </nav>

                    {/* Right Section */}
                    <div className='hidden md:flex gap-6 items-center'>
                        <p className='cursor-pointer hover:text-gray-200'>🔔</p>
                        <button className='bg-white text-emerald-600 px-4 py-1 rounded-lg hover:bg-gray-200 transition'>
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button className='cursor-pointer hover:text-gray-300 duration-150' onClick={() => setMenuOpen(!menuOpen)}>
                            ☰
                        </button>
                    </div>
                </header>

                {/* Mobile Drawer */}
                <div
                    className={`fixed top-0 right-0 h-full w-64 md:hidden bg-emerald-600 text-white transform transition-transform duration-300 ease-in-out z-50
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className='flex justify-between items-center p-4 border-b border-emerald-400'>
                        <h2 className='font-semibold'>Menu</h2>
                        <button onClick={() => setMenuOpen(false)} className='cursor-pointer hover:text-gray-300 duration-150'>✖</button>
                    </div>

                    <ul className='flex flex-col gap-6 p-4 font-medium'>
                        <li><Link onClick={() => setMenuOpen(false)} to="/">Home</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/about">About</Link></li>

                        <li className='border-t border-emerald-400 pt-4'>🔔 Notification</li>

                        <li>
                            <button className='w-full bg-white text-emerald-600 py-2 rounded-lg'>
                                Login
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Overlay */}
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`fixed inset-0 bg-black/50 bg-opacity-80 md:hidden transition-opacity duration-300 z-40
    ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                />
            </div>

            {/* Routes */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/room' element={<Room />} />
                <Route path='/room/:id' element={<RoomDetail />} />
                <Route path='/room/:id/booking' element={<Booking />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </>
    )
}

export default Header