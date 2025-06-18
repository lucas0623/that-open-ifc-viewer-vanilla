import * as THREE from "three";
import * as OBC from "@thatopen/components";

export class SceneManager {
  private world: OBC.World;
  private components: OBC.Components;

  constructor(components: OBC.Components) {
    this.components = components;
    const worlds = components.get(OBC.Worlds);
    this.world = worlds.create();
  }

  initialize() {
    this.world.scene = new OBC.SimpleScene(this.components);
    //const light = this.world.scene.directionalLights.set("light", new THREE.DirectionalLight(0xffffff, 1.5));
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    this.world.scene.directionalLights.set("main", light);
    this.world.scene.three.add(light);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.world.scene.ambientLights.set("ambient", ambientLight);
    this.world.scene.three.add(ambientLight);
  
  }
  createSampleScene() {
    const material = new THREE.MeshStandardMaterial({ color: "#6528D7" });
    const geometry = new THREE.BoxGeometry();
    const cube1 = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);
    const cube3 = new THREE.Mesh(geometry, material);
    this.world.scene.three.add(cube1,cube2,cube3);
    const cubes = [cube1, cube2, cube3];

    cube1.rotation.x += Math.PI / 4.2;
    cube1.rotation.y += Math.PI / 4.2;
    cube1.rotation.z += Math.PI / 4.2;
    cube1.position.y = 3;
    cube2.position.x = 3;
cube3.position.x = -3;



    const oneDegree = Math.PI / 180;
    function rotateCubes() {
  cube1.rotation.x += oneDegree;
  cube1.rotation.y += oneDegree;
  cube2.rotation.x += oneDegree;
  cube2.rotation.z += oneDegree;
  cube3.rotation.y += oneDegree;
  cube3.rotation.z += oneDegree;
}
    if (this.world.renderer) {
      this.world.renderer.onBeforeUpdate.add(rotateCubes);
    }

    //cubes.updateMatrixWorld();
    
    // Return the cube so it can be used as a raycaster target
    return cubes;
  }

  getWorld() {
    return this.world;
  }
} 