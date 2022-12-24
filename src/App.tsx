import { useState } from "react";
import GameView from "./Views/GameView";
import NewGameMenu from "./Views/NewGameMenu";

const App = () => {
  const [againstCPU, setAgainstCPU] = useState(false);
  const [p1Mark, setP1Mark] = useState<1 | -1>(1);
  const [backToMenu, setBackToMenu] = useState(true);
  return (
    <main className="w-screen h-screen overflow-hidden bg-darkNavy px-6 flex justify-center items-center text-darkNavy">
      {backToMenu ? (
        <NewGameMenu
          p1Mark={p1Mark}
          setP1Mark={setP1Mark}
          setBackToMenu={setBackToMenu}
          setAgainstCPU={setAgainstCPU}
        />
      ) : (
        <GameView
          againstCPU={againstCPU}
          p1Mark={p1Mark}
          setBackToMenu={setBackToMenu}
        />
      )}

      {/* <NewGameMenu isP1X={false} /> */}
    </main>
    // <div className="bg-darkNavy w-screen h-screen flex flex-col justify-center items-center">
    //   <div className="my-4">
    //     <Button cType="primary" cColor="yellow">
    //       Button 1
    //     </Button>
    //   </div>
    //   <div className="my-4">
    //     <Button cType="primary" cColor="blue">
    //       Button 1
    //     </Button>
    //   </div>
    //   <div className="my-4">
    //     <Button cType="secondary" cColor="yellow">
    //       Button 1
    //     </Button>
    //   </div>
    //   <div className="my-4">
    //     <Button cType="secondary" cColor="blue">
    //       <Restart />
    //     </Button>
    //   </div>
    // </div>
  );
};

export default App;
