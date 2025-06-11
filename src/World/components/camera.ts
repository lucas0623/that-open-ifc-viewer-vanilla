import { PerspectiveCamera } from 'three';
import { SimpleCamera } from '@thatopen/components';
import { Components } from '@thatopen/components';

function createCamera(components: Components) {
  const camera = new SimpleCamera(components);

  camera.three= new PerspectiveCamera (
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.three.position.set(0, 0, 15);

  return camera;
}

export { createCamera };
