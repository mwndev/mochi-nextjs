import React, { useState } from "react";
import Link from "next/link";

export default function index() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <div className="flexColWrapper outerWrapper">
        <h2>login</h2>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="text" onChange={(e) => setPass(e.target.value)} />
        <div id="googleSignInDiv"></div>
        <button onClick={() => {}}>login</button>
        <button onClick={() => {}}>register</button>
        <button onClick={() => {}}>log data</button>
      </div>
      <style jsx>{`
        .outerWrapper {
          gap: 1cm;
        }
        button,
        input {
          width: 4cm;
          aspect-ratio: 4 / 1;
          text-align: center;
        }
      `}</style>
    </>
  );
}
