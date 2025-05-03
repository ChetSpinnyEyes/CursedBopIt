import "./App.css";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export function genCommand(): string {
  const commands = ["BopIt", "TwistIt", "SpinIt", "PullIt", "FlickIt"];
  // audio
  const randCommand = commands[Math.floor(Math.random() * commands.length)];
  let fileName = `${randCommand}_Command.mp3`;
  console.log("Chet audio", fileName);
  if (randCommand === "BopIt") {
    fileName = `Rabbit_${Math.floor(Math.random() * 3) + 1}.mp3`;
  }
  const commandAudio = new Audio(fileName);
  commandAudio.volume = randCommand === "BopIt" ? 0.5 : 0.2;
  commandAudio.play();

  return randCommand;
}

function App() {
  const [pressed, setPressed] = useState("BopIt");
  const [timer, setTimer] = useState(0);
  const [command, setCommand] = useState(genCommand);
  const [timeLimit, setTimeLimit] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  function handleToyClick(clickedName: string) {
    setPressed(clickedName);
    if (!gameOver && clickedName === command) {
      setScore(score + 1);
      setTimer(0);
      setCommand(genCommand());
    }
  }

  useEffect(() => {
    if (gameOver) {
      return;
    } else if (timer > timeLimit) {
      setGameOver(true);
      const gameOverAudio = new Audio("Lose_SFX.mp3");
      gameOverAudio.volume = 0.2;
      gameOverAudio.play();
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setTimer(() => timer + 0.1);
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timer]);
  return (
    <>
      <div id="debugText">
        <h1>{gameOver ? "game over" : command}</h1>
        <h2>{"pressed: " + pressed}</h2>
        <h2>{timer.toFixed(1)}</h2>
        <h3>{"score: " + score}</h3>
      </div>
      <div id="canvasContainer">
        <Canvas>
          <Model onToyClick={handleToyClick}></Model>
          <OrbitControls></OrbitControls>
          <Environment preset="studio" environmentIntensity={0.3}></Environment>
        </Canvas>
      </div>
    </>
  );
}

export default App;
