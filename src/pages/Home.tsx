import React, {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas} from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import sakura from "../assets/sakura.mp3";
import {soundon, soundoff} from "../assets/icons";

const Home = () => {
    const audioRef = useRef(new Audio(sakura));
    audioRef.current.volume = 0.4
    audioRef.current.loop = true
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);

    const adjustIslandForScreenSize = () =>{
        let screenScale = null
        const screenPosition = [0, -6.5, -43]
        const rotation = [0.1, 4.7, 0]
        if(window.innerWidth <768){
            screenScale = [0.9, 0.9, 0.9]
        }else{
            screenScale = [1, 1, 1]
        }
        return [screenScale, screenPosition, rotation]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
    const adjustPlaneForScreenSize = () =>{
        let screenScale, screenPosition

        if(window.innerWidth <768){
            screenScale = [1.5, 1.5, 1.5]
            screenPosition = [0, -1.5, 0]
        }else{
            screenScale = [3, 3, 3]
            screenPosition = [0, -4, -4]
        }
        return [screenScale, screenPosition]
    }

    const [planeScale, planePosition] = adjustPlaneForScreenSize()
    useEffect(() => {
        if(isPlayingMusic){
            audioRef.current.play()
        }
        return () => {
            audioRef.current.pause()
        };
    }, [isPlayingMusic]);

  return (
    <div>
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage}/>}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{near:0.1, far:1000}}>
                <Suspense fallback={<Loader/>}>
                    <directionalLight position={[1,1,1]} intensity={2}/>
                    <ambientLight intensity={0.5}/>
                    <hemisphereLight skyColor='#b1e1ff' groundColor='#000' intensity={1}/>
                    <Sky isRotating={isRotating}/>
                    <Bird/>
                    <Plane
                        position={planePosition}
                        scale={planeScale}
                        isRotating={isRotating}
                        rotation={[0,20,0]}
                    />
                    <Island
                        position={islandPosition}
                        rotation={islandRotation}
                        scale={islandScale}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                        isRotating={isRotating}
                    />
                </Suspense>
            </Canvas>
            <div className='absolute bottom-2 left-2'>
                <img alt='sound'
                 src={isPlayingMusic ? soundoff : soundon}
                 className='w-10 h-10 cursor-pointer object-contain'
                 onClick={()=> setIsPlayingMusic(!isPlayingMusic)}
                />

            </div>
        </section>
    </div>
  )
}

export default Home
