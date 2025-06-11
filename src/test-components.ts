// Test file for Components usage
import { Components } from '@thatopen/components';

// Basic usage example
async function test() {
  const components = new Components();
  
  // Check available properties and methods
  console.log('Components properties:', Object.getOwnPropertyNames(components));
  console.log('Components prototype:', Object.getOwnPropertyNames(Components.prototype));
  
  // Check specific components
  if (components.scene) {
    console.log('Scene methods:', Object.getOwnPropertyNames(components.scene));
  }
  
  if (components.renderer) {
    console.log('Renderer methods:', Object.getOwnPropertyNames(components.renderer));
  }
  
  if (components.tools) {
    console.log('Tools methods:', Object.getOwnPropertyNames(components.tools));
  }
}

test();
