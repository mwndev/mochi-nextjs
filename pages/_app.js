import Header from "../src/components/Header/Header";

//no "/" at end of url
export const backendURL = `http://localhost:${process.env.PORT}`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        html {
          font-family: "Quicksand", "sans-serif";
          --default-radius: 0.25cm;
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
