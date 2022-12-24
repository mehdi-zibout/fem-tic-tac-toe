/// <reference types="vite-plugin-svgr/client" />
import type { Dispatch, SetStateAction } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Xicon } from "../assets/icon-x.svg";
import { ReactComponent as Oicon } from "../assets/icon-o.svg";
import Card from "../Components/Card";
import Button from "../Components/Button";

type NGMProps = {
  p1Mark: 1 | -1;
  setP1Mark: Dispatch<SetStateAction<1 | -1>>;
  setBackToMenu: Dispatch<SetStateAction<boolean>>;
  setAgainstCPU: Dispatch<SetStateAction<boolean>>;
};

const NewGameMenu = ({
  p1Mark,
  setP1Mark,
  setBackToMenu,
  setAgainstCPU,
}: NGMProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Logo className="mb-8 tablet:mb-10" />
      <Card className="p-6 bg-semiDarkNavy flex justify-center items-center flex-col mb-8 tablet:mb-10 tablet:w-[28.75rem]">
        <div className="uppercase text-hxs text-silver mb-8">
          pick player 1's mark
        </div>
        <div className="bg-darkNavy p-2 rounded-[10px] flex items-center justify-center h-[4.5rem]">
          <button
            onClick={() => setP1Mark(1)}
            className={`bg-silver rounded-[10px] w-[8.25rem] tablet:w-[12.375rem] py-3 flex justify-center items-center  h-[3.375rem] ${
              p1Mark === 1
                ? "bg-opacity-100 fill-darkNavy"
                : "fill-silver bg-opacity-0 hover:bg-opacity-5"
            }  `}
          >
            <Xicon className="scale-50 " />
          </button>
          <button
            onClick={() => setP1Mark(-1)}
            className={`bg-silver rounded-[10px] w-[8.25rem] tablet:w-[12.375rem] py-3 flex justify-center items-center h-[3.375rem] ${
              p1Mark === -1
                ? "bg-opacity-100 fill-darkNavy"
                : "fill-silver bg-opacity-0 hover:bg-opacity-5"
            }  `}
          >
            <Oicon className="scale-50 " />
          </button>
        </div>
        <div className="uppercase text-silver text-body pt-5 pb-1 text-opacity-50">
          remember : x goes first
        </div>
      </Card>
      <Button
        onClick={() => {
          setAgainstCPU(true);
          setBackToMenu(false);
        }}
        cType="primary"
        cColor="yellow"
        className="mb-5 tablet:w-[28.75rem]"
      >
        NEW GAME (VS CPU)
      </Button>
      <Button
        onClick={() => {
          setAgainstCPU(false);
          setBackToMenu(false);
        }}
        cType="primary"
        cColor="blue"
        className="tablet:w-[28.75rem]"
      >
        NEW GAME (VS PLAYER)
      </Button>
    </div>
  );
};

export default NewGameMenu;
