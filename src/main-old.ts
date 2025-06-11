import { World } from './World/World.ts';
import { Components } from '@thatopen/components';
import './style.css';

function main() {
  console.log('Hello, Three.js World!');
  // Get a reference to the container element
  const container = document.querySelector('#scene-container') as HTMLElement;
  console.log('Container found:', !!container);
  console.log('Container dimensions:', container ? `${container.clientWidth}x${container.clientHeight}` : 'N/A');
  
  const components = new Components();
  console.log('Components initialized:', !!components);
  
  try {
    // create a new world
    console.log('Creating world...');
    const world = new World(components, container);
    console.log('World created successfully:', !!world);

    // Comment out Stats since it's causing errors
    /*
    const stats = new Stats();
    stats.showPanel(2);
    document.body.append(stats.dom);
    stats.dom.style.left = "0px";
    stats.dom.style.zIndex = "unset";
    world.renderer.onBeforeUpdate.add(() => stats.begin());
    world.renderer.onAfterUpdate.add(() => stats.end());
    */
    world.render();
    
    // draw the scene
    //components.init();
    console.log('Components initialized successfully!');
  } catch (error) {
    console.error('Error in scene initialization:', error);
  }
}

main();
