import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import { Earth } from './Components/Earth/earth';
// import Navbarr from './Components/Navbar/Navbar';





function App() {
  return (
    <div id='CanvasContainer'>
      <Canvas>
        <Suspense fallback={null}>
        <Earth/>
        </Suspense>
      </Canvas>
      
      </div>
  );
}

export default App;
