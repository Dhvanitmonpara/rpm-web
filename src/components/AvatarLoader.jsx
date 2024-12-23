import { GLTFLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

// eslint-disable-next-line react/prop-types
const AvatarLoader = ({ url }) => {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, url);

  return (
    <primitive 
      // eslint-disable-next-line react/no-unknown-property
      object={gltf.scene} // Ensure this is correct
      scale={[1, 1, 1]}  // Adjust scale if necessary
    />
  );
};

export default AvatarLoader;
