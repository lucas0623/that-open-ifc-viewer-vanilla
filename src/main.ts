import * as THREE from "three";
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
import { SimpleAxesHelper } from './utils/simpleAxesHelper';
import { RaycasterManager } from './utils/raycaster.ts';

function main() {
  // Initialize components
  const container = document.querySelector('.scene-container') as HTMLElement;
  const uiContainer = document.querySelector('.ui-container') as HTMLElement;
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
  const statsManager = new StatsManager(world,container);
  // Initialize axes helper
  const simpleAxesHelper = new SimpleAxesHelper(world, 5);
  

  // Setup everything
  ifcLoader.initialize();
  panel.initialize();
  statsManager.initialize();
  simpleAxesHelper.initialize();
  //raycasterManager.initialize();
    // Create sample scene
  const cubes = sceneManager.createSampleScene();

  // Initialize raycaster
  const raycasterManager = new RaycasterManager(components, world);
  raycasterManager.initialize(cubes);

  //Try Clipper
  // const casters = components.get(OBC.Raycasters);
  // casters.get(world);
  // const clipper = components.get(OBC.Clipper);
  // clipper.enabled = true;
  // container.ondblclick = () => {
  //   console.log("Double click detected");
  // if (clipper.enabled) {
  //   clipper.create(world);
  //   clipper.visible = true;
  //   console.log("Clipper created and visible");
  // }
//};




  
  // Set aspect ratio and update projection matrix
  (world.camera.three as THREE.PerspectiveCamera).aspect = container.clientWidth / container.clientHeight;
  (world.camera.three as THREE.PerspectiveCamera).updateProjectionMatrix();


}


main()



