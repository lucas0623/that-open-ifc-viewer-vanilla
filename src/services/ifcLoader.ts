import * as OBC from "@thatopen/components";

export class IfcLoaderService {
  private fragmentIfcLoader: OBC.IfcLoader;
  private world: OBC.World;

  constructor(components: OBC.Components, world: OBC.World) {
    this.fragmentIfcLoader = components.get(OBC.IfcLoader);
    this.world = world;
  }

  initialize() {
    this.fragmentIfcLoader.setup();
    this.fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
  }

  async loadOnlineIfc() {
    console.log("Loading IFC file...");
    const file = await fetch(
      "https://thatopen.github.io/engine_components/resources/small.ifc",
    );
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    
    const model = await this.fragmentIfcLoader.load(buffer);
    model.name = "example";
    this.world.scene.three.add(model);
    console.log("IFC file loaded successfully!");
    return model;
  }

  async loadLocalIfc(file: File) {
    console.log("Loading local IFC file...");
    try {
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      
      const model = await this.fragmentIfcLoader.load(buffer);
      model.name = file.name.replace('.ifc', '');
      this.world.scene.three.add(model);
      console.log("Local IFC file loaded successfully!");
      return model;
    } catch (error) {
      console.error("Error loading IFC file:", error);
      throw error;
    }
  }
} 