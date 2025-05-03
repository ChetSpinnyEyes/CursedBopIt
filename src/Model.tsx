import { useAnimations, useGLTF } from "@react-three/drei";
import * as three from "three";

export default function Model({
  onToyClick: handleToyClick,
}: {
  onToyClick: (clickedName: string) => void;
}) {
  const { scene, animations } = useGLTF("BopIt_Ver10.glb");
  const { actions } = useAnimations(animations, scene);

  function handleClick(event: any) {
    const clickedName = event.object.name;
    actions[clickedName]?.setLoop(three.LoopOnce, 1).reset().play();
    handleToyClick(clickedName);
  }

  return <primitive object={scene} onClick={handleClick}></primitive>;
}
