// import * as THREE from "three";
// import * as BUI from "@thatopen/ui";
// import Stats from "stats.js";
import * as OBC from "@thatopen/components";
//import * as WEBIFC from "web-ifc";
import './style.css';

import { SceneManager } from './core/scene';
import { CameraManager } from './core/camera';
import { RendererManager } from './core/renderer';
import { IfcLoaderService } from './services/ifcLoader';
import { FragmentOperations } from './services/fragmentOperations';
import { StatsManager } from './utils/stats';
import { PanelManager } from './ui/panel';

function main() {
  // Initialize components
  const container = document.querySelector('#scene-container') as HTMLElement;
  const uiContainer = document.querySelector('#ui-container') as HTMLElement;
  const components = new OBC.Components();

  // Initialize core managers
  const sceneManager = new SceneManager(components);
  const world = sceneManager.getWorld();
  const cameraManager = new CameraManager(components, world);
  const rendererManager = new RendererManager(components, world, container);
  
  sceneManager.initialize();
  rendererManager.initialize();
  cameraManager.initialize();
  components.init();
  // Initialize services
  console.log(world);
  const ifcLoader = new IfcLoaderService(components, world);
  const fragmentOperations = new FragmentOperations((world as any).components);
  const grids = components.get(OBC.Grids);
  const grid = grids.create(world);

  // Initialize UI
  const panel = new PanelManager(
    world,
    grid,
    uiContainer,
    ifcLoader,
    fragmentOperations
  );

  // Initialize performance monitoring
  const statsManager = new StatsManager(world);

  // Setup everything

  ifcLoader.initialize();
  panel.initialize();
  statsManager.initialize();
  

  // Create sample scene
  sceneManager.createSampleScene();

  // Set aspect ratio and update projection matrix
  world.camera.three.aspect = container.clientWidth / container.clientHeight;
  //world.renderer?.three.setSize(container.clientWidth, container.clientHeight);
  //world.renderer?.three.setPixelRatio(window.devicePixelRatio);
  world.camera.three.updateProjectionMatrix();
  
  //world.camera.three.updateProjectionMatrix();
  // Debug logs for aspect ratio investigation
  // if (world.camera && world.renderer) {
  //   const camera = world.camera as any;
  //   const renderer = world.renderer as any;
  //   console.log('Camera properties:', {
  //     aspect: camera.three.aspect,
  //     fov: camera.three.fov,
  //     near: camera.three.near,
  //     far: camera.three.far
  //   });
  //   console.log('Renderer size:', {
  //     width: renderer.three.domElement.width,
  //     height: renderer.three.domElement.height
  //   });
  //   console.log('Container dimensions:', {
  //     width: container.clientWidth,
  //     height: container.clientHeight,
  //     aspect: container.clientWidth / container.clientHeight
  //   });
  //}
  
}

main()