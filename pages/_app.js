import { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import { UserContext } from "../src/contexts";

//no "/" at end of url
export const backendURL = `http://localhost:${process.env.PORT}`;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (res) => {
    try {
      console.log(`Encoded JWT Token: ${res.credentials}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "706801501845-gg3t3t0arpmkgs0o0bq8ctdnr0pc8q8d.apps.googleusercontent.com",
      callback: handleCallbackResponse(),
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    const autoLogin = async () => {};
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
