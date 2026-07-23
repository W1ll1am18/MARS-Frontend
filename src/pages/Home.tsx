import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
// @ts-ignore
import Mars from '../assets/Mars'
import './Home.css'

const ENTRANCE_DURATION = 2.5  //Seconds
const ENTRANCE_RISE = 10     //Units travelled

function MarsEntrance() {
  const groupRef = useRef<THREE.Group>(null)
  const startTime = useRef<number | null>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    if (startTime.current === null) startTime.current = state.clock.elapsedTime

    const elapsed = state.clock.elapsedTime - startTime.current
    const progress = Math.min(elapsed / ENTRANCE_DURATION, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, eased))
    groupRef.current.position.y = THREE.MathUtils.lerp(-ENTRANCE_RISE, 0, eased)
  })

  return (
    <group ref={groupRef} scale={0.01} position={[0, -ENTRANCE_RISE, 0]}>
      <Center>
        <Mars scale={2} position={[0, -1.5, 0]} />
      </Center>
    </group>
  )
}

const Home = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 3,
      up: Math.random() > 0.42,
    }))
  }, [])

  return (
    <>
      <div className='screen-layout'>
        <div className='home-container'>
          <div className='starfield' aria-hidden='true'>
            {stars.map(s => (
              <span
                key={s.id}
                className={`star ${s.up ? 'star-up' : 'star-down'}`}
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                }}
              />
            ))}
          </div>

          <div className='title'>MARS</div>
          <div className='abbrev'>Market Analysis Recommendation Strategy</div>
          <div className='description'>A Comprehensive Tool for the Stock Market</div>
          <Canvas camera={{ position: [0, 0, 3]  }} style={{ background: 'transparent' }} gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <OrbitControls enableDamping enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={-0.5} />
            <Suspense fallback={null}>
              <MarsEntrance />
            </Suspense>
            <Environment preset='night' />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default Home