import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-[60px] bg-white rounded-md text-2xl
    font-bold flex justify-center items-center gap-2 my-5'>
        <img src="/logo.png" alt="" />
        <h1>Firebase Contact App</h1>
    </nav>
  )
}

export default Navbar;
