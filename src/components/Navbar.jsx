import React from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

import logo from '../../images/bridge.png';


const Navbar = () => {

  const Menu = () => (
    <>
        <div><a href="#instructions">Instructions</a></div>
        <div><a href="#transactions">Transactions</a></div>
        <div><a href="#aboutMe">About Me</a></div>
    </>
    )

  const [toggleMenu, setToggleMenu] =  useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-48 cursor-pointer" />
      </div>
      <div className="text-white md:flex hidden flex-row justify-self-start  flex-initial mx-4 cursor-pointer justify-between w-80">
        <Menu />
      </div>
      {/* Mobile */}
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <div className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></div>
            <Menu />
          </ul>
        )}
      </div>
      {/* End of mobile */}
    </nav>
  );
};

export default Navbar;