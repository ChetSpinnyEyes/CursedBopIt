import "./App.css";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [pressed, setPressed] = useState("BopIt");
  return (
    <div id="canvasContainer">
      <h1>{pressed}</h1>
      <Canvas>
        <Model setPressed={setPressed}></Model>
        <OrbitControls></OrbitControls>
        <Environment preset="studio" environmentIntensity={0.3}></Environment>
      </Canvas>
    </div>
  );
}

export default App;
