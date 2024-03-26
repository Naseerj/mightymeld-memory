import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <div className="w-96 bg-[#FDF3FA] mx-auto my-[5rem] p-3 text-center rounded-xl h-[25rem] content-center">
      <div className="items-center">
        <h2 className="text-[60px] font-bold py-3 text-[#EC519C]">Memory</h2>
        <p className="font-bold py-5 text-[#EC519C]">Flip over tiles looking for pairs</p>
        <button
          onClick={start}
          className="bg-[#E85098] text-white p-[0.2rem] rounded-[3rem] text-[20px] w-[7rem] mt-8 font-normal shadow-md"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0); 
  const [predictCount, setPredictCount] = useState(0)
  const  predictedCount = useRef('')
  // console.log(KeyboardEvent.)


  const predictFunction = (()=>{
    if (event.keyCode === 13 || event.which === 13 || event.keyCode === 10 || event.which === 10) console.log('Working')
    const newValue =  predictedCount.current.value
    setPredictCount(newValue)

  })

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className="text-center w-36 items-center justify-center mx-auto p-6 flex justify-between font-semibold ">Tries:
      <div className="bg-[#EEF2FF] w-12 p-1 rounded-md mt-0">{tryCount}</div> 
      </div>
      <div className="bg-[#EFF1FF] mx-auto  w-[24rem] mt-auto rounded-lg grid-rows-4">
        {getTiles(16).map((tile, i) => (
          <Tile key={i} flip={() => flip(i)} {...tile} />
        ))}
      </div>
      <div onChange={()=>{
        console.log('HEYYYY')
        predictFunction()
      }} >PredictCount: <input ref={predictedCount} type="text" />{predictCount} </div>
    </>
  );
}
