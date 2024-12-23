/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei"; // Import Html from drei
import ReadyPlayerMeAvatar from "./components/RPM"; // Your avatar component
import AvatarController from "./components/AvatarController"; // Your avatar controller

const App = () => {
  const avatarRef = useRef(null);
  const [facialData, setFacialData] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          style={{
            width: "100%",
            height: "100%",
          }}
          camera={{ position: [0, 1, 2], fov: 75 }}
        >
          {/* Suspense with fallback to show loading indicator */}
          <Suspense fallback={<Html center>Loading...</Html>}>
            <ReadyPlayerMeAvatar
              url={import.meta.env.VITE_RPM_URL}
              ref={avatarRef}
              position={[0, -0.5, 0]}
            />
          </Suspense>

          {/* Add Lights */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />

          {/* Control Avatar Animations */}
          <AvatarController
            setFacialData={setFacialData}
            facialData={facialData}
            avatarRef={avatarRef}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
