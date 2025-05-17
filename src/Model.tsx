import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as three from "three";
import { commands } from "./App";

export default function Model({
  onToyClick: handleToyClick,
}: {
  onToyClick: (clickedName: string) => void;
}) {
  const backgroundMusic = useRef(
    new Audio("(Funky) Mars 15 at 30k - Dan _Lebo_ Lebowitz, Tone Seeker.mp3")
  );
  const { scene, animations } = useGLTF("BopIt_Ver10.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    backgroundMusic.current.volume = 0.1;
    backgroundMusic.current.play();
  }, []);

  function handleClick(event: any) {
    const clickedName = event.object.name;
    actions[clickedName]?.setLoop(three.LoopOnce, 1).reset().play();
    // play audio
    if (commands.includes(clickedName)) {
      const buttonSFX = new Audio(`${clickedName}_SFX.mp3`);

      buttonSFX.volume = 0.1;
      buttonSFX.play();

      // speed up background music
      backgroundMusic.current.playbackRate *= 1.01;

      handleToyClick(clickedName);
    }
  }

  return <primitive object={scene} onClick={handleClick}></primitive>;
}
