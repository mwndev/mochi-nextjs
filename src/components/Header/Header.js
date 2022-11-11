import React from 'react'
import styled from 'styled-components'

const PH = styled.header`
  height: calc(1.3cm + 4vh);
  width: 100%;
  border-bottom: 2px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  transform: translateY(0.3cm);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 0.3cm;
  border: 2px solid #82490b;
  background-color: white;
  span{
    font-size: 3em;
    color: #82490b;
  }
`

const IconWrapper = styled.div`
  height: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    height: 50%;
    aspect-ratio: 1 / 1;
  }
`


export default function Header() {
  return (
    <PH>
      <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 80C0 71.16 7.164 64 16 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H16C7.164 96 0 88.84 0 80zM0 240C0 231.2 7.164 224 16 224H432C440.8 224 448 231.2 448 240C448 248.8 440.8 256 432 256H16C7.164 256 0 248.8 0 240zM432 416H16C7.164 416 0 408.8 0 400C0 391.2 7.164 384 16 384H432C440.8 384 448 391.2 448 400C448 408.8 440.8 416 432 416z"/></svg>
      </IconWrapper>
      <Logo>
        <span>草</span>
      </Logo>
      <IconWrapper></IconWrapper>
    </PH>
  )
}
