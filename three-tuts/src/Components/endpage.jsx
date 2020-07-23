import { OrbitControls } from "drei";
import React, { Component, Suspense, useEffect, useState } from "react";
import { a, useTransition } from "react-spring";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./endpage.css";

const SpaceShip = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel);
  });

  return model ? <primitive object={model.scene} /> : null;
};
function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      )
  );
}

class endpage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="bg" />
        <h1>
          TheEnd
          <br />
          <span></span>
        </h1>
        <Canvas
          shadowMap
          camera={{ position: [0, 0, 21] }}
          style={{ height: 950 }}
        >
          <ambientLight intensity={0.75} />
          <pointLight intensity={1} position={[-10, -32, -10]} />
          <spotLight
            castShadow
            intensity={2.25}
            angle={0.2}
            penumbra={1}
            position={[25, 25, 25]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />
          <fog attach="fog" args={["#cc7b32", 20, 30]} />
          <Suspense fallback={null}>
            <SpaceShip />
          </Suspense>
          <OrbitControls
            autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <div className="layer" />
        <Loading />
        <a
          href="https://github.com/HackGod2000/TouchDown.js"
          className="top-left"
          children="Github"
        />

        <a
          href="https://github.com/drcmda/react-three-fiber"
          className="top-right"
          children="+ react-three-fiber"
        />
      </>
    );
  }
}

export default endpage;
