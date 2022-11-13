import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authenticateUser, sendToken } from "../../src/functions/fetches";
import jwt_decode from "jwt-decode";
import { backendURL } from "../_app";

export default function index() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  //google login

  const handleCallbackResponse = async (res) => {
    try {
      console.log(jwt_decode(res.credential));
      const svData = await sendToken(res.credential);
      window.alert(svData.m);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //comment for eslint
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "706801501845-gg3t3t0arpmkgs0o0bq8ctdnr0pc8q8d.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.prompt();
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  return (
    <>
      <div className="flexColWrapper outerWrapper">
        <h2>login</h2>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="text" onChange={(e) => setPass(e.target.value)} />
        <button onClick={() => authenticateUser({ name, pass })}>login</button>
        <div id="googleSignInDiv"></div>
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
