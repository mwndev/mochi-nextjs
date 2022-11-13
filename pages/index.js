import Link from "next/link";
import { PictureBorder, SquarePicture } from "../src/general/Pictures";

export default function Home() {
  return (
    <div className="flexColWrapper">
      <div className="wrapper">
        <style jsx>{`
          h2,
          h3 {
            width: 100%;
          }
          .wrapper {
            max-width: 85%;
            width: calc(25vw + 10cm);
          }
          .pageItem {
            max-width: 100%;
          }
          .order {
            background-color: green;
            color: yellow;
            border: 3px solid darkgreen;
            height: 100%;
            max-width: calc(6cm + 300px);
            width: 100%;
            aspect-ratio: 13 / 2;
            border-radius: var(--default-radius);
          }
          span {
            font-size: 1.8em;
            color: #fafafa;
          }
        `}</style>
        <div className="flexColWrapper">
          <h2>Freshly made Mochi</h2>
          <h3>Right here in Warsaw</h3>
          <PictureBorder>
            <SquarePicture
              src={
                "https://cdn.discordapp.com/attachments/881604322864025640/1040671206447255652/unknown.png"
              }
            />
          </PictureBorder>
          <button className="order">
            <Link className="flexWrapper" href={"/order"}>
              <span>Order now</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
