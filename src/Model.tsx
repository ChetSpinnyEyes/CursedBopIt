import { useAnimations, useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";
import * as three from "three";

export default function Model({
  setPressed,
}: {
  setPressed: Dispatch<SetStateAction<string>>;
}) {
  const { scene, animations } = useGLTF("BopIt_Ver10.glb");
  const { actions } = useAnimations(animations, scene);

  function onClick(event: any) {
    const clickedName = event.object.name;
    actions[clickedName]?.setLoop(three.LoopOnce, 1).reset().play();
    setPressed(clickedName);
  }

  return <primitive object={scene} onClick={onClick}></primitive>;
}
