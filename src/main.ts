import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";
import './style.css';

function main() {

  //boiler plate of setting up the scene 
  const container = document.querySelector('#scene-container') as HTMLElement;
  const components = new OBC.Components();
  const worlds = components.get(OBC.Worlds);

  const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

components.init();

world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);

world.scene.setup();
//world.scene.three.background = null;

//Setup grid
const grids = components.get(OBC.Grids);
const grid = grids.create(world);

//Try IFC loader
const fragments = components.get(OBC.FragmentsManager);
const fragmentIfcLoader = components.get(OBC.IfcLoader);
fragmentIfcLoader.setup();

fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;



//Sample scene setup
  const material = new THREE.MeshLambertMaterial({
  color: "yellow",
  transparent: true,
  opacity: 1.0,
});
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
world.scene.three.add(cube);

cube.rotation.x += Math.PI / 4.2;
cube.rotation.y += Math.PI / 4.2;
cube.rotation.z += Math.PI / 4.2;
cube.updateMatrixWorld();


// const resizeSystem = new ResizeSystem(components);
// components.add(resizeSystem);
// resizeSystem.resize();

//Stats setup
const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
stats.dom.style.zIndex = "unset";
world.renderer.onBeforeUpdate.add(() => stats.begin());
world.renderer.onAfterUpdate.add(() => stats.end());

//UI setup
const uiContainer = document.querySelector('#ui-container') as HTMLElement;
BUI.Manager.init();
const panel = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
    <bim-panel label="Worlds Tutorial" class="options-menu">
      <bim-panel-section collapsed label="Controls">
      
        <bim-button label="Load IFC"
          @click="${() => {
            loadIfc();
          }}">
        </bim-button>  
            
        <bim-button label="Export fragments"
          @click="${() => {
            exportFragments();
          }}">
        </bim-button>  
            
        <bim-button label="Dispose fragments"
          @click="${() => {
            disposeFragments();
          }}">
        </bim-button>

        <bim-checkbox label="Grid visible" checked 
          @change="${({ target }: { target: BUI.Checkbox }) => {
            grid.config.visible = target.value;
          }}">
        </bim-checkbox>

        <bim-color-input 
          label="Grid Color" color="#bbbbbb" 
          @input="${({ target }: { target: BUI.ColorInput }) => {
            grid.config.color = new THREE.Color(target.color);
          }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.1" label="Grid primary size" value="1" min="0" max="10"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            grid.config.primarySize = target.value;
          }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Grid secondary size" value="10" min="0" max="20"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            grid.config.secondarySize = target.value;
          }}">
        </bim-number-input>

        <bim-color-input 
          label="Background Color" color="#202932" 
          @input="${({ target }: { target: BUI.ColorInput }) => {
            world.scene.config.backgroundColor = new THREE.Color(target.color);
          }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.1" label="Directional lights intensity" value="1.5" min="0.1" max="10"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            world.scene.config.directionalLight.intensity = target.value;
          }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Ambient light intensity" value="1" min="0.1" max="5"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            world.scene.config.ambientLight.intensity = target.value;
          }}">
        </bim-number-input>
        
      </bim-panel-section>
    </bim-panel>
    `;
});

uiContainer.append(panel);
const button = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
      <bim-button class="phone-menu-toggler" icon="solar:settings-bold"
        @click="${() => {
          if (panel.classList.contains("options-menu-visible")) {
            panel.classList.remove("options-menu-visible");
          } else {
            panel.classList.add("options-menu-visible");
          }
        }}">
      </bim-button>
    `;
});

uiContainer.append(button);

}

function initialize(){

}
function createUI(){
  
}
async function loadIfc() {
  console.log("Loading IFC file...");
  const file = await fetch(
    "https://thatopen.github.io/engine_components/resources/small.ifc",
  );
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const model = await fragmentIfcLoader.load(buffer);
  model.name = "example";
  world.scene.three.add(model);
}

function download(file: File) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function exportFragments() {
  if (!fragments.groups.size) {
    return;
  }
  const group = Array.from(fragments.groups.values())[0];
  const data = fragments.export(group);
  download(new File([new Blob([data])], "small.frag"));

  const properties = group.getLocalProperties();
  if (properties) {
    download(new File([JSON.stringify(properties)], "small.json"));
  }
}

function disposeFragments() {
  fragments.dispose();
}


main()