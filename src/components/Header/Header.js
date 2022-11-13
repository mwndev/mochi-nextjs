import React, { useState } from 'react'
import Menu from './Menu'
import Link from 'next/link'



export default function Header() {
  
  const [active, toggleMenu] = useState(false)
  
  return (
    <>
    <Menu active={active} toggle={toggleMenu} />
    <header>
      <div className='iconWrapper' onClick={() => toggleMenu(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 80C0 71.16 7.164 64 16 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H16C7.164 96 0 88.84 0 80zM0 240C0 231.2 7.164 224 16 224H432C440.8 224 448 231.2 448 240C448 248.8 440.8 256 432 256H16C7.164 256 0 248.8 0 240zM432 416H16C7.164 416 0 408.8 0 400C0 391.2 7.164 384 16 384H432C440.8 384 448 391.2 448 400C448 408.8 440.8 416 432 416z"/></svg>
      </div>

      <div className='logo'>
      <Link href={'/'}>
        <span>草</span>
      </Link>
      </div>
      <div className='iconWrapper'></div>
    </header>


    <style jsx>{`
      header{
        height: calc(1.3cm + 4vh);
        max-height: calc(1.3cm + 4vh);
        width: 100%;
        border-bottom: 2px solid #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        box-shadow: 0 0 6px grey;

      }
      .iconWrapper{
        height: 100%;
        aspect-ratio: 4 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg{
        height: 50%;
        max-height: 50%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
      }
      .logo{
        height: 100%;
        aspect-ratio: 1 / 1;
        transform: translateY(0.3cm);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3cm;
        border: 2px solid #82490b;
        background-color: white;
        position: relative;
        box-shadow: 0 0 4px grey;
      }
      span{
        font-size: 3em;
        color: #82490b;
      }
       
    `}</style>
    </>
  )
}
