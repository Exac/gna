import { Component, ElementRef, OnInit } from '@angular/core';
import { rebindGL } from './globals';
import { Shader } from './java/shader';
import { Vector3 } from './java/vector3';
import { Vector2 } from './java/vector2';
import { Quaternion } from './java/quaternion';
import { Matrix4 } from './java/matrix4';
import { Transform } from './java/transform';
import { Vertex } from './java/vertex';
import { Camera } from './java/camera';
import { Time } from './java/time';
import { Util } from './java/util';
import { WorldObject } from './java/world-object';
import { Input } from './java/input';
import { CoreEngine } from './java/core-engine';
import { TestWorld } from './java/test-world';
import { LookAtComponent } from './java/look-at-component';
import { BaseLight } from './java/base-light';
import { DirectionalLight } from './java/directional-light';
import { FreeMove } from './java/free-move';
import { WorldComponent } from './java/world-component';
import { Material } from './java/material';
import { Texture } from './java/texture';
import { PointLight } from './java/point-light';
import { Attenuation } from './java/attenuation';
import { SpotLight } from './java/spot-light';
import { RenderingEngine } from './java/rendering-engine';
import { Window } from './java/window';
import { MappedValues } from './java/mapped-values';
import { ShaderResource } from './java/shader-resource';
import { TextureResource } from './java/texture-resource';


@Component({
  selector: 'gna-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  providers: []
})
export class CanvasComponent implements OnInit {

  constructor (private elementRef: ElementRef) {

  }

  ngOnInit (): void {

    // Global initiation
    rebindGL(this.elementRef.nativeElement,
      'temp-canvas',
      'main-canvas',
      720,
      480); // because context starts on two temp canvases.

    // TEMP CODE

    // ENGINE

    // ENGINE.CORE
    const vec2 = new Vector2(1, 1);
    const vec3 = new Vector3(1, 1, 1);
    const vec4 = new Quaternion(1, 1, 1, 1);
    const mat4 = new Matrix4().InitIdentity();
    const tran = new Transform();
    const time = new Time();
    const util = new Util();
    const woob = new WorldObject();
    const inpt = new Input();
    const core = new CoreEngine(720, 480, 144, new TestWorld());
    // ENGINE.COMPONENTS
    const bslt = new BaseLight(vec3, 0.9);
    const cmra = new Camera(mat4);
    const dilt = new DirectionalLight(vec3, 0.9);
    // const frlk = new FreeLook(0.5); // TODO
    const frmv = new FreeMove(10, 87, 83, 65, 68);
    const woco = new WorldComponent();
    // const mere = new MeshRenderer(
    //   new Mesh('mesh1.obj'),
    //   new Material(new Texture('diffuse.png'), 0.5, 0.5, new Texture('normal.png'), new Texture('dispMap.png'), 1.0, 0.0)
    // ); // TODO
    const polt = new PointLight(vec3, 1.0, new Attenuation(0.0, 0.0, 1));
    const splt = new SpotLight(vec3, 1.0, new Attenuation(0.0, 0.0, 1), 0.5);

    // ENGINE.RENDERING
    const attn = new Attenuation(0.0, 0.0, 1);
    // const matl = new Material(...); // todo
    // const mesh = new Mesh('mesh.obj'); // TODO
    const reen = new RenderingEngine(); // TODO
    const shad = new Shader('shader');
    const text = new Texture('texture.png'); // TODO
    const vert = new Vertex(vec3, vec2, vec3, vec3);
    const wind = new Window(); // TODO
    // ENGINE.RENDERING.MESHLOADING
    // const inmo = IndexedModel(); // TODO
    // const OBJIndex = new OBJIndex(); // TODO
    // const OBJModel = new OBJModel(); // TODO
    // ENGINE.RENDERING.RESOURCEMANAGEMENT
    // const mere = new MeshResource(); // TODO
    const shre = new ShaderResource();
    const tere = new TextureResource(); // TODO
    // WORLD
    const lacp = new LookAtComponent();
    const tstw = new TestWorld(); // TODO
    const main = new CanvasComponent(this.elementRef); // TODO

  }
}
