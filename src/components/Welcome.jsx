import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { GiWallet } from "react-icons/gi"
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import matic from "../utils/assets/maticlogo.png"

import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { shortenAddress } from "../utils/shortenAddress";


const ServiceCard = ({color, title, icon, subtitle}) => (
  <div className='flex flex-row justtify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl hover:bg-[#383f51]'>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-white text-lg'>{title}</h1>
      <p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
    </div>
  </div>
)

/* Special Components */

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

/* End of Special Components */

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext);

  /* Ethereum functions */

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    //We dont want to reload the page when submit the form
    e.preventDefault();

    //if we dont have all data -> out of the function
    if (!addressTo || !amount || !keyword || !message) return;
    //else
    sendTransaction();
  };

  /* End of Ethereum functions */

  return (
    <div className="flex w-full justify-center items-center" id='transfer'>
      <div className="flex mf:flex-row flex-col items-start justify-center md:pl-20  2xl:pl-64 pb-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col max-w-lg mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          Get started in decentralized finance. Obtain free crypto from Polygon's tesnet (Mumbai), connect your wallet and send money to anyone in the world in seconds.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center mt-5 bg-[#2a55f0] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <GiWallet className="text-white mr-2"/>
              <p className="text-white text-base font-semibold">
                Connect Your Wallet
              </p>
            </button>
          )}
          {currentAccount && (
            <p className="text-[#2a55f0] text-base font-semibold animate-pulse mt-5">
              YOUR WALLET IS CONNECTED
            </p>
          )}

          
<div className='flex-1 flex flex-col justify-start items-center mt-6'>
        <ServiceCard 
          color = 'bg-white'
          title = 'Polygon Mumbai Blockchain'
          icon = {<img src={matic} alt="logo" fontSize={21} className = 'text-white' />} 
          subtitle = {<a
            href="https://mumbai.polygonscan.com/address/0x789ac75c3070c801833f5eec53c6984b2bddd4c5"
            target="_blank"
            rel="noreferrer"
          >
            The Transfers System rules under contract: 0x789AC75C3070c801833F5EeC53C6984b2BDDd4C5
          </a>}
        />
        
      </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/100 flex justify-center items-center">
              <img src={matic} alt="logo" className="w-48 cursor-pointer" />
              </div>
              {/* <BsInfoCircle fontSize={17} color="#fff" /> */}
            </div>
            <div>
              <p className="text-white font-light text-sm">
                {shortenAddress(currentAccount)}
              </p>
              <p className="text-white font-semibold text-lg mt-1">
                CryptoCard
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input
            placeholder="Address To"
            name="addressTo"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Amount (MATIC)"
            name="amount"
            type="number"
            handleChange={handleChange}
          />
          <Input
            placeholder="Transaction Keyword"
            name="keyword"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Enter Message"
            name="message"
            type="text"
            handleChange={handleChange}
          />

          <div className="h-[1px] w-full bg-gray-400 my-2" />

          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Send now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
