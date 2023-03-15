import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import { Earth } from './Components/Earth/earth';
import Navbarr from './Components/Navbar/Navbar';




function App() {


  
  
  
  return (
    <div id='CanvasContainer'>
      <Canvas data-cy="canvas">
        <Suspense fallback={null}>
        <Earth data-cy="earth-canvas"/>
        </Suspense>
      </Canvas>
      <Navbarr/>
      </div>
  );
}

export default App;
