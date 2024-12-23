import { ConvaiClient } from "convai-web-sdk";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const ConvaiController = ({ onLipSync }) => {
  const convaiClient = useRef(null);

  useEffect(() => {
    convaiClient.current = new ConvaiClient({
      apiKey: import.meta.env.VITE_API_KEY,
      characterId: import.meta.env.VITE_CHARACTER_ID,
      enableFacialData: true,
      enableAudio: true,
    });

    // Set callback for viseme data (lip-sync)
    convaiClient.current.setResponseCallback((response) => {
      if (response.hasAudioResponse()) {
        const visemeData = response.getAudioResponse()?.getVisemesData()?.array[0];
        if (visemeData) {
          onLipSync(visemeData); // Pass viseme data to the parent
        }
      }
    });

    return () => {
      convaiClient.current?.resetSession();
    };
  }, [onLipSync]);

  return null;
};

export default ConvaiController;
