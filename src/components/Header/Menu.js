import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default function Menu({ active, toggle }) {
  return (
    <>
      <style jsx>{`
        //TODO check why it can't be 6cm in transform
        nav {
          padding: 0.3cm;
          height: 100vh;
          position: fixed;
          max-width: 90vw;
          width: calc(6cm + 8vw);
          transform: translateX(${active ? 0 : "calc( -7cm - 8vw - 10px)"});
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: baseline;
          background-color: white;
          border-right: 2px solid #000;
          z-index: 2;
          box-shadow: 0 0 10px grey;
        }
        .boxItem {
          height: calc(1cm + 3vh);
          max-height: calc(1cm + 3vh);
          max-width: 90%;
          width: calc(5cm + 5vw);
          display: flex;
          justify-content: left;
          align-items: center;
        }
        span {
          padding-left: calc(0.1cm + 2vw);
          color: var(--tc);
        }
        .exitWrapper {
          height: calc(1.3cm + 4vh);
          max-width: 90%;
          width: calc(5cm + 5vw);
          display: flex;
          justify-content: left;
          align-items: center;
          margin-bottom: calc(0.3cm + 1.5vh);
        }
        .iconWrapper {
          height: 100%;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg {
          height: 50%;
          max-height: 50%;
          aspect-ratio: 1 / 1;
          cursor: pointer;
        }
      `}</style>
      <nav active={active}>
        <div className="exitWrapper">
          <div
            className="iconWrapper"
            onClick={() => toggle(false)}
            color={"black"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
        </div>
        <div className="boxItem">
          <Link href={"/about"}>
            <span>About us</span>
          </Link>
        </div>
        <div className="boxItem">
          <Link href={"/location"}>
            <span>Visit us</span>
          </Link>
        </div>
        <div className="boxItem">
          <Link href={"/order"}>
            <span>Order</span>
          </Link>
        </div>
        <div className="boxItem">
          <Link href={"/order"}>
            <span>Order now</span>
          </Link>
        </div>
        <div className="boxItem">
          <Link href={"/contact"}>
            <span>Contact</span>
          </Link>
        </div>
        <div className="boxItem">
          <Link href={"/login"}>
            <span>Login</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
