import { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import { UserContext } from "../src/contexts";

//no "/" at end of url
export const backendURL = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const autoLogin = async () => {
      const res = await fetch(`${backendURL}/autologin`);
      const data = await res.json();
      if (res.status !== 200) window.alert("problem reaching server.");
      if (!data.valid) {
      }
      autoLogin();
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <>
          <>
            <>
              <Header />
              <div className="pageWrapper">
                <Component {...pageProps} />
              </div>
            </>
          </>
        </>
      </UserContext.Provider>
      <style jsx global>{`
        html {
          font-family: "Quicksand", "sans-serif";
          --default-radius: 0.25cm;
          --tc: #000;
        }
        .pageWrapper {
          width: 100%;
          padding-top: calc(2cm + 4vh);
        }
        .flexColWrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        .flexWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        body {
          margin: 0;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
        }
        * {
          font-weight: 400;
          text-align: left;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default MyApp;
