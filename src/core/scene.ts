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