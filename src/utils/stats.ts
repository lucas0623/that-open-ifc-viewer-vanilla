import Stats from "stats.js";
import * as OBC from "@thatopen/components";

export class StatsManager {
  private stats: Stats;
  private world: OBC.World;
  private container: HTMLElement;

  constructor(world: OBC.World, container: HTMLElement) {
    this.world = world;
    this.stats = new Stats();
    this.container = container;
    container.append(this.stats.dom);
  }

  initialize() {
    this.stats.showPanel(2);
    this.stats.dom.style.left = this.container.offsetLeft + "px";
    this.stats.dom.style.zIndex = "unset";

    if (this.world.renderer) {
      this.world.renderer.onBeforeUpdate.add(() => this.stats.begin());
      this.world.renderer.onAfterUpdate.add(() => this.stats.end());
    }
  }
} 