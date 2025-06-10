import './style.css'
import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";
import { createScene } from './World/components/scene';
import { createLights } from './World/components/lights';
import { createCube } from './World/components/cube';
import { createCamera } from './World/components/camera';

function main() {
  const container = document.getElementById("scene-container")!;
  const components = new OBC.Components();
  const worlds = components.get(OBC.Worlds);

//   const material = new THREE.MeshLambertMaterial({
//     color: "#6528D7",
//     transparent: true,
//     opacity: 0.2,
//   });
//   const geometry = new THREE.BoxGeometry();
//   const cube = new THREE.Mesh(geometry, material);
//   world.scene.three.add(cube);
  const scene = createScene(components);
  const camera = createCamera();
  const renderer = createRenderer();
  const cube = createCube();
  const light = createLights();
const world = worlds.create<scene, OBC.SimpleCamera, OBC.SimpleRenderer>();
//   const world = worlds.create<
//   OBC.SimpleScene,
//   OBC.SimpleCamera,
//   OBC.SimpleRenderer
// >();

 //world.scene = new OBC.SimpleScene(components);
 //world.renderer = new OBC.SimpleRenderer(components, container);
 //world.camera = new OBC.SimpleCamera(components);



// cube.rotation.x += Math.PI / 4.2;
// cube.rotation.y += Math.PI / 4.2;
// cube.rotation.z += Math.PI / 4.2;
// cube.updateMatrixWorld();
//components.init();



//world.scene.three.background = null;





// world.scene.setup();
// world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);

const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
stats.dom.style.zIndex = "unset";
// world.renderer.onBeforeUpdate.add(() => stats.begin());
// world.renderer.onAfterUpdate.add(() => stats.end());

BUI.Manager.init();

const panel = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
    <bim-panel label="Worlds Tutorial" class="options-menu">
      <bim-panel-section collapsed label="Controls">
      
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

document.body.append(panel);

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

document.body.append(button);

}

main();



