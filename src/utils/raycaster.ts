
import * as THREE from "three";
import * as OBC from "@thatopen/components";

export class RaycasterManager {  
  private components: OBC.Components;
  private world: OBC.World;
  private caster: any; // Using any type to avoid type errors
  private previousSelection: THREE.Mesh | null = null;
  private originalMaterials: Map<THREE.Mesh, THREE.Material> = new Map();
  private highlightMaterial: THREE.Material;
  private targets: THREE.Object3D[] = [];

  constructor(components: OBC.Components, world: OBC.World) {
    this.components = components;
    this.world = world;
    
    // Get the raycaster from OBC components
    const casters = this.components.get(OBC.Raycasters);
    this.caster = casters.get(this.world);
    
    // Create only the highlight material in constructor
    this.highlightMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  }

  public initialize(): void {
    // Setup the mouse move event listener
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }  public setTargets(objects: THREE.Object3D[]): void {
    this.targets = objects;
    
    // Store the original materials of all mesh objects
    objects.forEach(object => {
      if (object instanceof THREE.Mesh && object.material) {
        // Store the original material in our map
        this.originalMaterials.set(object, object.material);
      }
    });
  }
  public dispose(): void {
    // Remove event listener
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // Restore original materials if there's a selected object
    if (this.previousSelection) {
      const originalMaterial = this.originalMaterials.get(this.previousSelection);
      if (originalMaterial) {
        this.previousSelection.material = originalMaterial;
      }
    }
    
    // Clear references
    this.previousSelection = null;
    this.originalMaterials.clear();
    this.targets = [];
  }private handleMouseMove = (): void => {
    const result = this.caster.castRay(this.targets);
    
    // Reset previous selection if exists
    if (this.previousSelection) {
      // Restore the original material to the previously selected mesh
      const originalMaterial = this.originalMaterials.get(this.previousSelection);
      if (originalMaterial) {
        this.previousSelection.material = originalMaterial;
      }
      this.previousSelection = null;
    }
    
    // Return if no hit or not a mesh
    if (!result || !(result.object instanceof THREE.Mesh)) {
      return;
    }
    
    // Store reference to the selected mesh
    this.previousSelection = result.object;
    
    // Highlight the selected object
    result.object.material = this.highlightMaterial;
  }
}
