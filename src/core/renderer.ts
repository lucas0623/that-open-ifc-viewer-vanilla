import * as OBC from "@thatopen/components";

export class RendererManager {
  private world: OBC.World;
  private components: OBC.Components;
  private container: HTMLElement;

  constructor(components: OBC.Components, world: OBC.World, container: HTMLElement) {
    this.components = components;
    this.world = world;
    this.container = container;
  }

  initialize() {
    this.world.renderer = new OBC.SimpleRenderer(this.components, this.container);
  }
} 