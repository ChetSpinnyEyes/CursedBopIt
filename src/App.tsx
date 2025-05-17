import "./App.css";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export const commands = ["BopIt", "TwistIt", "SpinIt", "PullIt", "FlickIt"];

export function genCommand(): string {
  // audio
  const randCommand = commands[Math.floor(Math.random() * commands.length)];
  let fileName = `${randCommand}_Command.mp3`;
  if (randCommand === "BopIt") {
    fileName = `Rabbit_${Math.floor(Math.random() * 3) + 1}.mp3`;
  }
  const commandAudio = new Audio(fileName);
  commandAudio.volume = randCommand === "BopIt" ? 0.7 : 0.4;
  commandAudio.play();

  return randCommand;
}

function App() {
  const [pressed, setPressed] = useState("");
  const [timer, setTimer] = useState(-1);
  const [command, setCommand] = useState("");
  const [timeLimit, setTimeLimit] = useState(4);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);

  function startGame() {
    setGameOver(false);
    setCommand(genCommand());
    // if 0, the same as start
    setTimer(0);
  }

  function handleToyClick(clickedName: string) {
    setPressed(clickedName);
    if (!gameOver && clickedName === command) {
      setScore(score + 1);
      setTimer(0);
      // pass in function call to use result
      // if pass in function, react will think is updater function
      // and will pass in old value as param
      setCommand(genCommand());
      setTimeLimit(timeLimit * 0.98);
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
        <button id="startButton" onClick={startGame}>
          start
        </button>
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
