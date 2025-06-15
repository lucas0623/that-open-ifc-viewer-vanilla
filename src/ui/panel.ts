import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import { IfcLoaderService } from '../services/ifcLoader';
import { FragmentOperations } from '../services/fragmentOperations';


interface GridConfig {
  visible: boolean;
  color: THREE.Color;
  primarySize: number;
  secondarySize: number;
}

interface SceneConfig {
  backgroundColor: THREE.Color;
  directionalLight: {
    intensity: number;
  };
  ambientLight: {
    intensity: number;
  };
}

export class PanelManager {
  private world: OBC.World;
  private grid: { config: GridConfig };
  private uiContainer: HTMLElement;
  private ifcLoader: IfcLoaderService;
  private fragmentOperations: FragmentOperations;

  constructor(
    world: OBC.World,
    grid: { config: GridConfig },
    uiContainer: HTMLElement,
    ifcLoader: IfcLoaderService,
    fragmentOperations: FragmentOperations
  ) {
    this.world = world;
    this.grid = grid;
    this.uiContainer = uiContainer;
    this.ifcLoader = ifcLoader;
    this.fragmentOperations = fragmentOperations;
  }

  initialize() {
    BUI.Manager.init();
    this.createPanel();
    this.createMenuButton();
  }

  private createGridControls() {
    return BUI.html`
      <bim-panel-section collapsed label="Grid Controls">
        <bim-checkbox label="Grid visible" checked 
          @change="${({ target }: { target: BUI.Checkbox }) => {
            this.grid.config.visible = target.value;
          }}">
        </bim-checkbox>

        <bim-color-input 
          label="Grid Color" color="#bbbbbb" 
          @input="${({ target }: { target: BUI.ColorInput }) => {
            this.grid.config.color = new THREE.Color(target.color);
          }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.1" label="Grid primary size" value="1" min="0" max="10"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            this.grid.config.primarySize = target.value;
          }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Grid secondary size" value="10" min="0" max="20"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            this.grid.config.secondarySize = target.value;
          }}">
        </bim-number-input>
      </bim-panel-section>
    `;
  }

  private createSceneControls() {
    return BUI.html`
      <bim-panel-section collapsed label="Scene Controls">
        <bim-color-input 
          label="Background Color" color="#202932" 
          @input="${({ target }: { target: BUI.ColorInput }) => {
            const scene = this.world.scene as any;
            if (scene.config) {
              scene.config.backgroundColor = new THREE.Color(target.color);
            }
          }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.1" label="Directional lights intensity" value="1.5" min="0.1" max="10"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            const scene = this.world.scene as any;
            if (scene.config?.directionalLight) {
              scene.config.directionalLight.intensity = target.value;
            }
          }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Ambient light intensity" value="1" min="0.1" max="5"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            const scene = this.world.scene as any;
            if (scene.config?.ambientLight) {
              scene.config.ambientLight.intensity = target.value;
            }
          }}">
        </bim-number-input>
      </bim-panel-section>
    `;
  }

  private createFileControls() {
    return BUI.html`
      <bim-panel-section collapsed label="File Controls">
        <bim-button label="Load Online IFC" @click="${() => this.onLoadOnlineIfc()}"></bim-button>
        <bim-button label="Load Local IFC" @click="${() => this.onLoadLocalIfc()}"></bim-button>
        <bim-button label="Export fragments" @click="${() => this.onExportFragments()}"></bim-button>
        <bim-button label="Dispose fragments" @click="${() => this.onDisposeFragments()}"></bim-button>
      </bim-panel-section>
    `;
  }

  private createPanel() {
    const panel = BUI.Component.create<BUI.PanelSection>(() => {
      return BUI.html`
        <bim-panel label="Worlds Tutorial" class="options-menu">
          ${this.createFileControls()}
          ${this.createGridControls()}
          ${this.createSceneControls()}
        </bim-panel>
      `;
    });

    this.uiContainer.append(panel);
  }

  private createMenuButton() {
    const button = BUI.Component.create<BUI.PanelSection>(() => {
      return BUI.html`
        <bim-button class="phone-menu-toggler" icon="solar:settings-bold"
          @click="${() => {
            const panel = this.uiContainer.querySelector('.options-menu');
            if (panel?.classList.contains("options-menu-visible")) {
              panel.classList.remove("options-menu-visible");
            } else {
              panel?.classList.add("options-menu-visible");
            }
          }}">
        </bim-button>
      `;
    });

    this.uiContainer.append(button);
  }

  private async onLoadOnlineIfc() {
    try {
      await this.ifcLoader.loadOnlineIfc();
    } catch (error) {
      console.error("Error loading online IFC:", error);
    }
  }

  private async onLoadLocalIfc() {
    // Create file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.ifc';
    
    // Set up file input change handler
    fileInput.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      
      if (!files || files.length === 0) {
        console.log("No file selected");
        return;
      }
      
      try {
        await this.ifcLoader.loadLocalIfc(files[0]);
      } catch (error) {
        console.error("Error loading local IFC:", error);
      }
    };
    
    // Trigger file picker
    fileInput.click();
  }

  private onExportFragments() {
    this.fragmentOperations.exportFragments();
  }

  private onDisposeFragments() {
    this.fragmentOperations.disposeFragments();
  }
} 