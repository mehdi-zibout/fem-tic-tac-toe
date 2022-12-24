/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Xicon } from "../assets/icon-x.svg";
import { ReactComponent as Oicon } from "../assets/icon-o.svg";

import Card from "../Components/Card";
import Button from "../Components/Button";

type NGMProps = {
  isP1X: boolean;
};

const NewGameMenu = ({ isP1X }: NGMProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Logo className="mb-8 tablet:mb-10" />
      <Card className="mb-8 tablet:mb-10 tablet:w-[28.75rem]">
        <div className="uppercase text-hxs text-silver mb-8">
          pick player 1's mark
        </div>
        <div className="bg-darkNavy p-2 rounded-[10px] flex items-center justify-center h-[4.5rem]">
          <button
            className={`bg-silver rounded-[10px] w-[8.25rem] tablet:w-[12.375rem] py-3 flex justify-center items-center  h-[3.375rem] ${
              isP1X
                ? "bg-opacity-100 fill-darkNavy"
                : "fill-silver bg-opacity-0 hover:bg-opacity-5"
            }  `}
          >
            <Xicon className="scale-50 " />
          </button>
          <button
            className={`bg-silver rounded-[10px] w-[8.25rem] tablet:w-[12.375rem] py-3 flex justify-center items-center h-[3.375rem] ${
              !isP1X
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
        cType="primary"
        cColor="yellow"
        className="mb-5 tablet:w-[28.75rem]"
      >
        NEW GAME (VS CPU)
      </Button>
      <Button cType="primary" cColor="blue" className="tablet:w-[28.75rem]">
        NEW GAME (VS PLAYER)
      </Button>
    </div>
  );
};

export default NewGameMenu;
