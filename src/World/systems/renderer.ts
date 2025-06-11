import { WebGLRenderer } from 'three';
import { SimpleRenderer } from '@thatopen/components';
import { Components } from '@thatopen/components';

function createRenderer(components: Components,container: HTMLElement) {
  console.log('Creating SimpleRenderer...');
  const renderer = new SimpleRenderer(components,container);
  console.log('SimpleRenderer created:', !!renderer);
  
  console.log('Creating WebGLRenderer...');
  renderer.three = new WebGLRenderer();
  console.log('WebGLRenderer created:', !!renderer.three);
  console.log('WebGL support check:', WebGLRenderer.isWebGLAvailable ? WebGLRenderer.isWebGLAvailable() : 'Method not available');
  console.log('Renderer canvas:', !!renderer.three.domElement);

  renderer.three.physicallyCorrectLights = true;
  console.log('Renderer size:', container.clientWidth, container.clientHeight);
  console.log('Pixel ratio:', window.devicePixelRatio);
  
  return renderer;
}

export { createRenderer };
