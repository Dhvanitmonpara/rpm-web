/* eslint-disable react/no-unknown-property */
import { useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { GLTFLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

// eslint-disable-next-line react/prop-types
const ReadyPlayerMeAvatar = forwardRef(({ url, position }, ref) => {
  const gltf = useLoader(GLTFLoader, url);
  const avatarRef = useRef(null);

  // Use ref to expose the scene or any methods
  useImperativeHandle(ref, () => ({
    scene: gltf.scene,
    setPosition: (y) => {
      gltf.scene.position.y = y; // Dynamically set the position
    },
  }));

  useEffect(() => {
    // Initially set the position of the avatar
    if (gltf.scene) {
      gltf.scene.position.y = -0.5; // Move avatar down in Y-axis
    }
  }, [gltf]);

  return (
    <primitive
      ref={avatarRef}
      object={gltf.scene}
      scale={1}
      position={position} // You can also set the initial position here
    />
  );
});

// Add a display name for debugging purposes
ReadyPlayerMeAvatar.displayName = "ReadyPlayerMeAvatar";

export default ReadyPlayerMeAvatar;
