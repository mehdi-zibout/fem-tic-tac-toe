/// <reference types="vite-plugin-svgr/client" />
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Xicon } from "../assets/icon-x.svg";
import { ReactComponent as Oicon } from "../assets/icon-o.svg";
import { ReactComponent as Ohover } from "../assets/icon-o-outline.svg";
import { ReactComponent as Xhover } from "../assets/icon-x-outline.svg";
import { ReactComponent as Restart } from "../assets/icon-restart.svg";
import Button from "../Components/Button";
import Card from "../Components/Card";

type GameViewProps = {
  game: (0 | 1 | -1)[][];
  setGame: Dispatch<SetStateAction<(0 | 1 | -1)[][]>>;
  setTurn: Dispatch<SetStateAction<boolean>>;
  turn: boolean;
};
const GameView = () => {
  const [game, setGame] = useState<(0 | -1 | 1)[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [turn, setTurn] = useState(true);
  const handleClick = (i: 0 | 1 | -1, j: 0 | 1 | -1) => {
    const newGameState = game;
    if (turn) newGameState[i][j] = 1;
    else newGameState[i][j] = -1;
    setGame(newGameState);
    const x = determineWinner(newGameState);
    console.log(x);
    if (x === 1) console.log("X won");
    if (x === -1) console.log("O won");
    if (x === 0) console.log("draw");
    setTurn(!turn);
  };
  return (
    <div className="flex flex-col justify-between tablet:justify-center items-center tablet:w-[28.75rem] w-[20.5rem] h-[32.25rem] tablet:h-[38.94rem]">
      <header className="flex justify-between w-full tablet:mb-5">
        <Logo className="mt-2" />
        <Card className="group bg-semiDarkNavy mt-2 tablet:mt-0 h-10 w-[6rem] tablet:h-[3.25rem]  tablet:w-[8.75rem] pt-2 px-4 pb-4 flex justify-center items-center relative">
          {turn ? (
            <Xicon className="fill-silver scale-[0.25]  tablet:scale-[0.3125]  absolute -left-2 tablet:left-3  " />
          ) : (
            <Oicon className="fill-silver scale-[0.25]  tablet:scale-[0.3125]  absolute -left-2 tablet:left-3  " />
          )}

          <div className=" -mr-7 text-silver text-hxs text-[14px] tablet:text-hxs uppercase">
            turn
          </div>
        </Card>
        <Button
          cType="secondary"
          cColor="blue"
          className="block"
          onClick={() =>
            setGame([
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
            ])
          }
        >
          <Restart />
        </Button>
      </header>
      <main className="w-full">
        {game.map((row, i) => (
          <div key={i} className="flex mb-5">
            {row.map((field, j) => (
              <Card
                onClick={() => {
                  if (!game[i][j])
                    handleClick(i as 0 | 1 | -1, j as 0 | 1 | -1);
                }}
                key={`(${i},${j})`}
                className={`bg-semiDarkNavy  cursor-pointer w-24 h-24 tablet:w-[8.75rem] tablet:h-[8.75rem] flex justify-center items-center first-of-type:mr-5 last-of-type:ml-5`}
              >
                {field === 0 ? (
                  turn ? (
                    <Xhover className="fill-lightBlue scale-[0.625] tablet:scale-100 opacity-0 hover:opacity-100 duration-200  transition" />
                  ) : (
                    <Ohover className="fill-lightYellow  scale-[0.625] tablet:scale-100 opacity-0 hover:opacity-100 duration-200 transition" />
                  )
                ) : field === 1 ? (
                  <Xicon className="fill-lightBlue scale-[0.625] tablet:scale-100" />
                ) : (
                  <Oicon className="fill-lightYellow  scale-[0.625] tablet:scale-100" />
                )}
              </Card>
            ))}
          </div>
        ))}
        <footer className="w-full flex justify-between">
          <Card className="shadow-none text-center bg-lightBlue w-24 h-16 tablet:w-[8.75rem] tablet:h-[4.5rem] flex flex-col justify-center items-center">
            <div className="text-body">X ( YOU )</div>
            <div className="text-hm">14</div>
          </Card>
          <Card className="shadow-none text-center bg-silver w-24 h-16 tablet:w-[8.75rem] tablet:h-[4.5rem] flex flex-col justify-center items-center">
            <div className="text-body">TIES</div>
            <div className="text-hm">32</div>
          </Card>
          <Card className="shadow-none text-center bg-lightYellow w-24 h-16 tablet:w-[8.75rem] tablet:h-[4.5rem] flex flex-col justify-center items-center">
            <div className="text-body">O ( P1 )</div>
            <div className="text-hm">11</div>
          </Card>
        </footer>
      </main>
    </div>
  );
};

export default GameView;

function determineWinner(game: (0 | -1 | 1)[][]) {
  // calculate sum of every line
  // if sum is 3 X won if sum is -3 O won anything else is a draw
  let sum = game[0][0] + game[1][1] + game[2][2];
  if (sum === 3) return 1;
  if (sum === -3) return -1;
  sum = game[0][2] + game[1][1] + game[2][0];
  if (sum === 3) return 1;
  if (sum === -3) return -1;
  for (let i = 0; i < 3; i++) {
    sum = game[i][0] + game[i][1] + game[i][2];
    if (sum === 3) return 1;
    if (sum === -3) return -1;
  }
  for (let j = 0; j < 3; j++) {
    sum = game[0][j] + game[1][j] + game[2][j];
    if (sum === 3) return 1;
    if (sum === -3) return -1;
  }
  let isDraw = true;
  game.forEach((line) => {
    line.forEach((move) => {
      if (!move) isDraw = false;
    });
  });
  if (isDraw) return 0;
  return Infinity;
}
