import * as THREE from "three";
import * as OBC from "@thatopen/components";

export class SimpleAxesHelper {
  private world: OBC.World;
  private axesHelper: THREE.AxesHelper;
  private size: number;

  constructor(world: OBC.World, size: number = 5) {
    this.world = world;
    this.size = size;
    this.axesHelper = new THREE.AxesHelper(this.size);
  }

  public initialize(): void {
    console.log('SimpleAxesHelper: Initializing');
    
    // Check if the world scene exists
    if (!this.world.scene || !this.world.scene.three) {
      console.error('SimpleAxesHelper: world.scene.three is not available');
      return;
    }
    
    try {
      // Add the axes helper directly to the scene
      console.log('SimpleAxesHelper: Adding axes helper to scene');
      (this.world.scene.three as THREE.Scene).add(this.axesHelper);
      
      // Position it at the world origin (0,0,0)
      this.axesHelper.position.set(0, 0, 0);
      
      // Make sure the axes are thick enough to be easily visible
      const material = this.axesHelper.material as THREE.Material;
      if (Array.isArray(material)) {
        material.forEach(m => {
          if (m instanceof THREE.LineBasicMaterial) {
            m.linewidth = 3; // Note: linewidth may not work in all browsers/GPUs
          }
        });
      } else if (material instanceof THREE.LineBasicMaterial) {
        material.linewidth = 3; // Note: linewidth may not work in all browsers/GPUs
      }
      
      console.log('SimpleAxesHelper: Axes helper added successfully at position', this.axesHelper.position);
    } catch (error) {
      console.error('SimpleAxesHelper: Error during initialization', error);
    }
  }

  public dispose(): void {
    if (this.axesHelper && this.world.scene.three) {
      (this.world.scene.three as THREE.Scene).remove(this.axesHelper);
      this.axesHelper.dispose();
    }
  }
}
