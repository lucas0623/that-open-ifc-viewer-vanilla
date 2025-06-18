import * as THREE from "three";
import * as OBC from "@thatopen/components";

export class RaycasterManager {  
  private components: OBC.Components;
  private world: OBC.World;
  private caster: any; // Using any type to avoid type errors
  private originalMaterials: Map<THREE.Mesh, THREE.Material> = new Map();
  private highlightMaterial: THREE.Material;
  private targets: THREE.Object3D[] = [];
  private lastLoggedObjectId: number | null = null;
  private logDebounceTimer: number | null = null;

  constructor(components: OBC.Components, world: OBC.World) {
    this.components = components;
    this.world = world;
    
    // Get the raycaster from OBC components
    const casters = this.components.get(OBC.Raycasters);
    this.caster = casters.get(this.world);
    
    // Create only the highlight material in constructor
    this.highlightMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  }

  public initialize(objects:any): void {
    let previousSelection: THREE.Mesh | null = null;
    const originalMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
    // Setup the mouse move event listener
    window.onmousemove = () => {
      const result = this.caster.castRay(objects);
      if (previousSelection) {
        previousSelection.material = originalMaterial;
      }
      if (!result || !(result.object instanceof THREE.Mesh)) {
        return;
      }
      result.object.material = this.highlightMaterial;
      previousSelection = result.object;
    };
  }
}
