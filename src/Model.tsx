import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as three from "three";

export default function Model({
  onToyClick: handleToyClick,
}: {
  onToyClick: (clickedName: string) => void;
}) {
  const { scene, animations } = useGLTF("BopIt_Ver10.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const backgroundMusic = new Audio("Alpha Mission - Jimena Contreras.mp3");
    backgroundMusic.volume = 0.04;
    backgroundMusic.play();
  }, []);

  function handleClick(event: any) {
    const clickedName = event.object.name;
    actions[clickedName]?.setLoop(three.LoopOnce, 1).reset().play();
    // play audio
    const buttonSFX = new Audio(`${clickedName}_SFX.mp3`);
    buttonSFX.volume = 0.2;
    buttonSFX.play();

    handleToyClick(clickedName);
  }

  return <primitive object={scene} onClick={handleClick}></primitive>;
}
