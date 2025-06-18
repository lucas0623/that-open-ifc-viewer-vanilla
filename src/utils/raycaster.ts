import * as THREE from "three";
import * as OBC from "@thatopen/components";

export class RaycasterManager {  
  private components: OBC.Components;
  private world: OBC.World;
  private caster: any; // Using any type to avoid type errors
  private highlightMaterial: THREE.Material;
  private targets: THREE.Object3D[] = [];
  private lastLoggedObjectId: number | null = null;
  private logDebounceTimer: number | null = null;
  //private previousSelection: THREE.Mesh | null = null;
  private originalMaterial: THREE.Material;

  constructor(components: OBC.Components, world: OBC.World) {
    this.components = components;
    this.world = world;
    
    // Get the raycaster from OBC components
    const casters = this.components.get(OBC.Raycasters);
    this.caster = casters.get(this.world);
    
    // Create only the highlight material in constructor
    this.highlightMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.originalMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
  }
  public initialize(objects:any): void {
    // Setup the mouse move event handler
    this.setupMouseMoveEvent(objects);
    this.setupMouseDoubleClickEvent(objects);
  }
  
  private setupMouseMoveEvent(objects:any): void {
    let previousSelection: THREE.Mesh | null = null;
    // Setup the mouse move event listener
    window.onmousemove = () => {
      const result = this.caster.castRay(objects);
      if (previousSelection) {
        previousSelection.material = this.originalMaterial;
      }
      if (!result || !(result.object instanceof THREE.Mesh)) {
        return;
      }
      result.object.material = this.highlightMaterial;
      previousSelection = result.object;
    };
  }

  private setupMouseDoubleClickEvent(objects:any): void {
    const casters = this.components.get(OBC.Raycasters);
    casters.get(this.world);
    const clipper = this.components.get(OBC.Clipper);
    clipper.enabled = true;

      window.ondblclick = () => {
        const result = this.caster.castRay(objects);
        if (!result || !(result.object instanceof THREE.Mesh)) {
        return;
      }
        
        if (clipper.enabled) {
          console.log("Double click detected");
          clipper.create(this.world);
          clipper.visible = true;
          console.log(clipper.list);
        }
  }
}
}
