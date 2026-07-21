import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls } from '@react-three/drei'
// @ts-ignore
import Mars from '../assets/Mars' //How to fix
// import space from '../assets/space.mp4'
import './Home.css'

//rafce
const Home = () => {

  //insert home 
  //Video is too high res, slowing application down
  return (
    <>
      <div className='screen-layout'>
        <div className='home-container'>
          {/* <video src={space} autoPlay loop muted/> */}
          <div className='title'>
            <h1>MARS</h1>
          </div>
          <div className='description'>
            <h1>A Comprehensive Tool for the Stock Market</h1>
          </div>
          <Canvas camera={{ position: [0, 0, 3] }} style={{ background: 'transparent' }} gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Suspense fallback={null}>
              <Center>
                <Mars scale={2} position={[0, -1.5, 0]} />
              </Center>
            </Suspense>
            <Environment preset='night' />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default Home