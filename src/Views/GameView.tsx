/// <reference types="vite-plugin-svgr/client" />
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Xicon } from "../assets/icon-x.svg";
import { ReactComponent as Oicon } from "../assets/icon-o.svg";
import { ReactComponent as Ohover } from "../assets/icon-o-outline.svg";
import { ReactComponent as Xhover } from "../assets/icon-x-outline.svg";
import { ReactComponent as Restart } from "../assets/icon-restart.svg";
import Button from "../Components/Button";
import Card from "../Components/Card";
import Modal from "../Components/Modal";

type GameViewProps = {
  oldGame?: (0 | 1 | -1)[][];
  oldScore?: {
    p1: number;
    p2: number;
    ties: number;
  };
  againstCPU: boolean;
  p1Mark: 1 | -1;
  setBackToMenu: Dispatch<SetStateAction<boolean>>;
};

const GameView = ({
  oldGame,
  oldScore,
  againstCPU,
  p1Mark,
  setBackToMenu,
}: GameViewProps) => {
  const [score, setScore] = useState(
    oldScore ? oldScore : { p1: 0, p2: 0, ties: 0 }
  );
  const [game, setGame] = useState<(0 | -1 | 1)[][]>(
    oldGame
      ? oldGame
      : againstCPU
      ? p1Mark === -1
        ? getRandomStartPosition()
        : [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ]
      : [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]
  );
  const [turn, setTurn] = useState(againstCPU ? p1Mark === 1 : true);
  const [showModal, setShowModal] = useState<false | -1 | 0 | 1 | "restart">(
    false
  );
  localStorage.setItem("gameState", JSON.stringify(game));
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("turn", JSON.stringify(turn));

  const handleClick = (i: 0 | 1 | -1, j: 0 | 1 | -1) => {
    const newGame = game;
    if (againstCPU) {
      newGame[i][j] = p1Mark;
      let x = cpuMoves(newGame, (-1 * p1Mark) as -1 | 1) as number[];
      if (x[0] !== -1 && determineWinner(newGame) < -1)
        newGame[x[0]][x[1]] = (-1 * p1Mark) as -1 | 1;
    } else {
      if (turn) {
        newGame[i][j] = 1;
      } else {
        newGame[i][j] = -1;
      }
      setTurn(!turn);
    }
    setGame([...newGame]);

    // did the game end
    const x = determineWinner(newGame);
    if (x >= -1) {
      if (x === 0) setScore({ ...score, ties: score.ties + 1 });
      if (x === 1)
        if (p1Mark === 1) setScore({ ...score, p1: score.p1 + 1 });
        else setScore({ ...score, p2: score.p2 + 1 });
      if (x === -1)
        if (p1Mark === 1) setScore({ ...score, p2: score.p2 + 1 });
        else setScore({ ...score, p1: score.p1 + 1 });
      setShowModal(x as -1 | 0 | 1);
    }
  };
  return (
    <div className="flex flex-col justify-between tablet:justify-center items-center tablet:w-[28.75rem] w-[20.5rem] h-[32.25rem] tablet:h-[38.94rem]">
      {showModal !== false &&
        (showModal === "restart" ? (
          <Modal>
            <div className="uppercase text-hm tablet:text-hl  text-silver mb-7">
              Restart Game?
            </div>
            <div className="">
              <Button
                onClick={() => {
                  setShowModal(false);
                }}
                cType="secondary"
                cColor="blue"
                className="uppercase mr-4 text-hxs"
              >
                no, cancel
              </Button>
              <Button
                onClick={() => {
                  const newGame = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                  ];
                  setGame(newGame as (-1 | 0 | 1)[][]);
                  const whoseTurnIsIt =
                    (score.p1 + score.p2 + score.ties) % 2 === 0;
                  setTurn(whoseTurnIsIt);
                  if (p1Mark === 1 && !whoseTurnIsIt && againstCPU) {
                    newGame[Math.floor(Math.random() * 3)][
                      Math.floor(Math.random() * 3)
                    ] = -1 * p1Mark;
                    setGame(newGame as (-1 | 0 | 1)[][]);
                    setTurn(!whoseTurnIsIt);
                  }
                  if (p1Mark === -1 && whoseTurnIsIt && againstCPU) {
                    newGame[Math.floor(Math.random() * 3)][
                      Math.floor(Math.random() * 3)
                    ] = -1 * p1Mark;
                    setGame(newGame as (-1 | 0 | 1)[][]);
                    setTurn(!whoseTurnIsIt);
                  }
                  setShowModal(false);
                }}
                cType="secondary"
                cColor="yellow"
                className="uppercase  text-hxs"
              >
                yes, restart{" "}
              </Button>
            </div>
          </Modal>
        ) : (
          <Modal>
            <div className="uppercase text-hxs text-silver">
              {showModal !== 0 &&
                (againstCPU
                  ? showModal === p1Mark
                    ? "YOU WON!"
                    : "OH NO, YOU LOST…"
                  : p1Mark === showModal
                  ? "PLAYER 1 WINS!"
                  : "PLAYER 2 WINS!")}
            </div>
            <div className="uppercase py-4 text-hm tablet:text-hl text-silver -mt-3 relative pl-3 tablet:pl-6">
              {showModal === 0 ? (
                "Round tied"
              ) : (
                <>
                  {showModal === 1 ? (
                    <Xicon className="fill-lightBlue inline tablet:-mt-5 scale-[0.43] tablet:scale-100 absolute -left-[2.7rem] top-0 tablet:static tablet:mr-2" />
                  ) : (
                    <Oicon className="fill-lightYellow inline tablet:-mt-5 scale-[0.43] tablet:scale-100 absolute -left-[2.7rem] top-0 tablet:static tablet:mr-2" />
                  )}
                  <span
                    className={`text-hm tablet:text-hl  ${
                      showModal === 1 ? "text-lightBlue" : "text-lightYellow"
                    }`}
                  >
                    takes the round
                  </span>
                </>
              )}
            </div>
            <div className="">
              <Button
                onClick={() => {
                  localStorage.removeItem("gameState");
                  localStorage.removeItem("score");
                  localStorage.removeItem("againstCPU");
                  localStorage.removeItem("turn");
                  localStorage.removeItem("p1Mark");

                  setBackToMenu(true);
                }}
                cType="secondary"
                cColor="blue"
                className="uppercase mr-4 text-hxs"
              >
                Quit
              </Button>
              <Button
                onClick={() => {
                  const newGame = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                  ];
                  setGame(newGame as (-1 | 0 | 1)[][]);
                  const whoseTurnIsIt =
                    (score.p1 + score.p2 + score.ties) % 2 === 0;
                  setTurn(whoseTurnIsIt);
                  if (p1Mark === 1 && !whoseTurnIsIt && againstCPU) {
                    newGame[Math.floor(Math.random() * 3)][
                      Math.floor(Math.random() * 3)
                    ] = -1 * p1Mark;
                    setGame(newGame as (-1 | 0 | 1)[][]);
                    setTurn(!whoseTurnIsIt);
                  }
                  if (p1Mark === -1 && whoseTurnIsIt && againstCPU) {
                    newGame[Math.floor(Math.random() * 3)][
                      Math.floor(Math.random() * 3)
                    ] = -1 * p1Mark;
                    setGame(newGame as (-1 | 0 | 1)[][]);
                    setTurn(!whoseTurnIsIt);
                  }
                  setShowModal(false);
                }}
                cType="secondary"
                cColor="yellow"
                className="uppercase  text-hxs"
              >
                next round
              </Button>
            </div>
          </Modal>
        ))}

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
          onClick={() => setShowModal("restart")}
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
                className={`bg-semiDarkNavy group  cursor-pointer w-24 h-24 tablet:w-[8.75rem] tablet:h-[8.75rem] flex justify-center items-center first-of-type:mr-5 last-of-type:ml-5`}
              >
                {field === 0 ? (
                  turn ? (
                    <Xhover className="fill-lightBlue scale-[0.625] tablet:scale-100 hidden group-hover:block " />
                  ) : (
                    <Ohover className="fill-lightYellow  scale-[0.625] tablet:scale-100 hidden group-hover:block " />
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
            <div className="text-body">
              {againstCPU
                ? p1Mark === 1
                  ? "X (YOU)"
                  : "X (CPU)"
                : p1Mark === 1
                ? "X (P1)"
                : "X (P2)"}
            </div>
            <div className="text-hm">{p1Mark === 1 ? score.p1 : score.p2}</div>
          </Card>
          <Card className="shadow-none text-center bg-silver w-24 h-16 tablet:w-[8.75rem] tablet:h-[4.5rem] flex flex-col justify-center items-center">
            <div className="text-body">TIES</div>
            <div className="text-hm">{score.ties}</div>
          </Card>
          <Card className="shadow-none text-center bg-lightYellow w-24 h-16 tablet:w-[8.75rem] tablet:h-[4.5rem] flex flex-col justify-center items-center">
            <div className="text-body">
              {againstCPU
                ? p1Mark === 1
                  ? "O (CPU)"
                  : "O (YOU)"
                : p1Mark === 1
                ? "O (P2)"
                : "O (P1)"}
            </div>
            <div className="text-hm">{p1Mark === -1 ? score.p1 : score.p2}</div>
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
  return -Infinity;
}

function cpuMoves(game: (0 | -1 | 1)[][], cpuMark: -1 | 1) {
  const scoreOfMoves = [
    (game[0][0] + game[1][1] + game[2][2]) * cpuMark,
    (game[0][2] + game[1][1] + game[2][0]) * cpuMark,
  ];
  for (let i = 0; i < 3; i++) {
    scoreOfMoves.push((game[i][0] + game[i][1] + game[i][2]) * cpuMark);
  }
  for (let j = 0; j < 3; j++) {
    scoreOfMoves.push((game[0][j] + game[1][j] + game[2][j]) * cpuMark);
  }
  // killing blow
  let risk = Math.max(...scoreOfMoves);
  if (risk > 1) {
    const indexOfRisk = scoreOfMoves.findIndex((x) => x === risk);
    if (indexOfRisk === 0) {
      return findAPossibleMove(game, [
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    }
    if (indexOfRisk === 1)
      return findAPossibleMove(game, [
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
    if (indexOfRisk >= 2 && indexOfRisk <= 4)
      return findAPossibleMove(game, [
        [indexOfRisk - 2, 0],
        [indexOfRisk - 2, 1],
        [indexOfRisk - 2, 2],
      ]);
    if (indexOfRisk > 4)
      return findAPossibleMove(game, [
        [0, indexOfRisk - 5],
        [1, indexOfRisk - 5],
        [2, indexOfRisk - 5],
      ]);
  }
  // im losing i have to defend
  risk = Math.min(...scoreOfMoves);
  if (risk < -1) {
    const indexOfRisk = scoreOfMoves.findIndex((x) => x === risk);
    if (indexOfRisk === 0) {
      return findAPossibleMove(game, [
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    }
    if (indexOfRisk === 1)
      return findAPossibleMove(game, [
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
    if (indexOfRisk >= 2 && indexOfRisk <= 4)
      return findAPossibleMove(game, [
        [indexOfRisk - 2, 0],
        [indexOfRisk - 2, 1],
        [indexOfRisk - 2, 2],
      ]);
    if (indexOfRisk > 4)
      return findAPossibleMove(game, [
        [0, indexOfRisk - 5],
        [1, indexOfRisk - 5],
        [2, indexOfRisk - 5],
      ]);
  }
  // no risk make a random move
  const possibleMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === 0) possibleMoves.push([i, j]);
    }
  }
  if (possibleMoves.length === 0) return [-1, -1];
  let x = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[x];
}

function findAPossibleMove(game: (0 | -1 | 1)[][], moves: number[][]) {
  let suggestedMove = [] as number[];
  moves.forEach((move) => {
    if (game[move[0]][move[1]] === 0) {
      suggestedMove = move;
      return;
    }
  });
  if (suggestedMove.length === 0) return [-1, -1];
  return suggestedMove;
}

function getRandomStartPosition(): (-1 | 0 | 1)[][] {
  const newGame = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ] as (-1 | 0 | 1)[][];
  newGame[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)] = 1;
  return newGame;
}
