import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";

function App() {
  const [screen, setScreen] = useState("splash");

  const handleCompleteSplash = () => {
    setScreen("home");
  };

  return (
    <>
      {screen === "splash" ? (
        <SplashScreen onComplete={handleCompleteSplash} />
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
