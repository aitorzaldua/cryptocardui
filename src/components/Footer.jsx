import './az.css';

import {BsLinkedin} from 'react-icons/bs';
import {IoLogoTwitter} from 'react-icons/io';
import {BsGithub} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai';



const Footer = () => {
  return (
    <section id='aboutMe' className='AboutMe'>
    <p className='footer__logo'>aitor.zaldua@draftdigital.org</p>

    <ul className='permalinks'>
      <li><a href='#transfers'>Transfers</a></li>
      <li><a href='#instructions'>Instructions</a></li>
      <li><a href='#transactions'>Transactions</a></li>
      <li><a href='https://aitorzaldua.netlify.app/' target="_blank" rel="noreferrer">MyPortfolio</a></li>
    </ul>

  <div className='footer__socials'>
    <a href='https://www.linkedin.com/in/aitor-zaldua/' target="_blank" rel="noreferrer"><BsLinkedin/></a>
    <a href='https://twitter.com' target="_blank" rel="noreferrer"><IoLogoTwitter/></a>
    <a href='https://github.com/aitorzaldua' target="_blank" rel="noreferrer"><BsGithub/></a>
  </div>

  <div className='footer__copyright'>
    <small>Designed with 💚 by MG based on JavaScriptMastery.</small>
  </div>


  </section>
)
}

export default Footer;