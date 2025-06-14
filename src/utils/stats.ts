import Stats from "stats.js";
import * as OBC from "@thatopen/components";

export class StatsManager {
  private stats: Stats;
  private world: OBC.World;

  constructor(world: OBC.World) {
    this.world = world;
    this.stats = new Stats();
  }

  initialize() {
    this.stats.showPanel(2);
    document.body.append(this.stats.dom);
    this.stats.dom.style.left = "0px";
    this.stats.dom.style.zIndex = "unset";

    if (this.world.renderer) {
      this.world.renderer.onBeforeUpdate.add(() => this.stats.begin());
      this.world.renderer.onAfterUpdate.add(() => this.stats.end());
    }
  }
} 