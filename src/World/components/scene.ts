import { Color, Scene } from 'three';
import { Components, SimpleScene } from '@thatopen/components';

function createScene(components: Components) {
  const scene = new SimpleScene(components);
  scene.three.background = new Color('skyblue');

  return scene;
}

export { createScene };
