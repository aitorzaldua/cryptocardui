import { FaFaucet } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import metamask from '../utils/assets/metmaskLogo.png';
import bridge from '../utils/assets/bridgeLogo.png';

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


const Services = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center gradient-bg-services'>
      <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
        <div className='flex-1 flex flex-col justify-start items-start'>
          <h1 className='text-white text-3xl sm:text-5xl py-2'>
            How to start in the Crypto Ecosystem
          </h1>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-start items-center w-[50rem]'>
        <ServiceCard 
          color = ''
          title = 'Metamask, the Crypto Wallet.'
          icon = {<img src={metamask}/>} 
          subtitle = {<a
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
          >
            ◦ Download and install Metamask, the most famous and widely used wallet. <br />
            ◦ Create an account and be sure to follow the security recommendations. <br />
            ◦ Adds the Polygon Mumbai test network. Identical to the main network but for testing. No real money involved. <br />
            ◦ You can use Metamask directly to send money but here you can add a keyword and a message to the transactions for added security.
          </a>}
        />
        <ServiceCard 
          color = 'bg-[#8945f8]'
          title = 'Click here for Free Matic.'
          icon = {<FaFaucet fontSize={21} className = 'text-white' />} 
          subtitle = {<a
            href="https://mumbaifaucet.com/"
            target="_blank"
            rel="noreferrer"
          >
            ◦ MATIC is the currency on the Polygon network. Just enter your wallet address and click "Send me MATIC". <br />
            ◦ You will receive 1 MATIC each time. In case of logging in Alchemy, you will receive 5 MATIC.<br />
            ◦ You can come back every 24 hours. <br />
            ◦ Transfer as much as you want and don't forget to check the fees to know the cost of each transaction.
          </a>}
        />
        <ServiceCard 
          color = ''
          title = 'Faster transactions than ever.'
          icon = {<img src={bridge} alt="logo"/>} 
          subtitle = {<a
            href="#transfer"
          >
            ◦ Select the address in Metamask in case you have more than one. Select, also in Metamask, the Mumbai network. <br />
            ◦ Connect your wallet to Crypto Transfer. Your address will be displayed on the Crypto card.<br />
            ◦ Enter the destination address, add the amount and the rest of the requested information and click the "Send now" button.<br />
            ◦ After a few seconds, the money will appear in the receiver's wallet. It's as simple as that. As fast as that.
          </a>}
        />
      </div>
    </div>
  )
}

export default Services;