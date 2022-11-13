import React from 'react'

export const PictureBorder = ({children, height}) => {
  return(
    <>
      <style jsx>{`
        span{
          height: height;
          max-height: height;
          box-shadow: 0 0 5px grey;
          max-width: 100%;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>
      <span>
        {children}
      </span>
    </>
  )
}

export function SquarePicture({src}) {
  return (
    <>
      <style jsx>{`
        img{
          max-height: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
        }
        
      `}</style>
      <img src={src} />
    </>
  )
}
