import * as OBC from "@thatopen/components";

export class CameraManager {
  private world: OBC.World;
  private components: OBC.Components;

  constructor(components: OBC.Components, world: OBC.World) {
    this.components = components;
    this.world = world;
  }

  initialize() {
    this.world.camera = new OBC.SimpleCamera(this.components);
    if (this.world.camera?.controls) {
      this.world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
    }
  }
} 