import GameView from "./Views/GameView";

const App = () => {
  return (
    <main className="w-screen h-screen overflow-hidden bg-darkNavy px-6 flex justify-center items-center text-darkNavy">
      <GameView />
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
