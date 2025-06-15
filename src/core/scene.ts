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
  }

  createSampleScene() {
    const material = new THREE.MeshLambertMaterial({
      color: "yellow",
      transparent: true,
      opacity: 1.0,
    });
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    this.world.scene.three.add(cube);

    cube.rotation.x += Math.PI / 4.2;
    cube.rotation.y += Math.PI / 4.2;
    cube.rotation.z += Math.PI / 4.2;
    cube.updateMatrixWorld();
  }

  getWorld() {
    return this.world;
  }
} 