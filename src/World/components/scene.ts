import { Color, Scene } from 'three';
import {SimpleScene} from '@thatopen/components';
import { Components } from '@thatopen/components';

function createScene(components: Components) {
  const scene = new SimpleScene(components);
  scene.three = new Scene();
  scene.three.background = new Color('skyblue');

  return scene;
}

export { createScene };
