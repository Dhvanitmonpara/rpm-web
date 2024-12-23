/* eslint-disable react/prop-types */
import { OvrToMorph } from "convai-web-sdk";
import { useEffect, useRef } from "react";

const AvatarController = ({ facialData, avatarRef }) => {
  const currentFrame = useRef(0);

  useEffect(() => {
    const updateBlendShapes = () => {
      if (facialData.length > 0 && avatarRef.current) {
        // Map viseme data to morph targets
        OvrToMorph(facialData[currentFrame.current], avatarRef.current.morphTargetInfluences);

        // Move to the next frame
        if (currentFrame.current < facialData.length - 1) {
          currentFrame.current += 1;
        }
      }
    };

    const interval = setInterval(updateBlendShapes, 16); // ~60fps
    return () => clearInterval(interval);
  }, [facialData, avatarRef]);

  return null;
};

export default AvatarController;
