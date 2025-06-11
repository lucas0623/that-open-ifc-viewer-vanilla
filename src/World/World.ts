import { createCamera } from './components/camera.ts';
import { createCube } from './components/cube.ts';
import { createLights } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';

import { SimpleRenderer } from '@thatopen/components';
import { SimpleScene } from '@thatopen/components';
import { SimpleCamera } from '@thatopen/components';
import { Components, Worlds} from '@thatopen/components';

let scene:SimpleScene;
let camera:SimpleCamera;
let renderer:SimpleRenderer;
let world:Worlds;

class World {
  constructor(components:Components,container: HTMLElement) {
    console.log('Create New World!');
    console.log('Container element:', container);
    console.log('Container dimensions:', `${container.clientWidth}x${container.clientHeight}`);
    
    try {
      console.log('Creating camera...');
      camera = createCamera(components);
      console.log('Camera created:', !!camera);
      console.log('Camera position:', camera.three.position);
      
      console.log('Creating scene...');
      scene = createScene(components);
      console.log('Scene created:', !!scene);
      
      console.log('Creating renderer...');
      renderer = createRenderer(components,container);
      console.log('Renderer created:', !!renderer);
      console.log('WebGL renderer available:', renderer.three && renderer.three.domElement);
      
      container.append(renderer.three.domElement);
      console.log('Renderer appended to container');
      
      console.log('Creating cube...');
      const cube = createCube();
      console.log('Cube created:', !!cube);
      
      console.log('Creating lights...');
      const light = createLights();
      console.log('Lights created:', !!light);
      
      console.log('Adding objects to scene...');
      scene.three.add(cube, light);
      console.log('Objects added to scene');
      
      console.log('Setting up resizer...');
      const resizer = new Resizer(container, camera, renderer);
      console.log('Resizer created:', !!resizer);
    } catch (error) {
      console.error('Error in World initialization:', error);
    }
  }

  render() {
     if (!scene) {
    console.error("Scene does not exist!");
    return;
  } else {
    console.log("Scene exists.");
    console.log("Scene contents:", scene.three.children); // Log objects in the scene
  }

  if (!camera) {
    console.error("Camera does not exist!");
    return;
  } else {
    console.log("Camera exists.");
    console.log("Camera position:", camera.three.position); // Log camera position
    console.log("Camera properties:", camera.three); // Log camera details
  }

  if (!renderer) {
    console.error("Renderer does not exist!");
    return;
  } else {
    console.log("Renderer exists.");
  }
    // draw a single frame
    renderer.three.render(scene.three, camera.three);

  }
}

export { World };
