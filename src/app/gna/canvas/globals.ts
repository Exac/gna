'use strict';
export let gl: WebGL2RenderingContext;
export let c: CanvasRenderingContext2D;

const tempGLCanvas = document.createElement('canvas');
tempGLCanvas.id = 'temp-canvas';
tempGLCanvas.width = 1;
tempGLCanvas.height = 1;
document.getElementsByTagName('body')[0].appendChild(tempGLCanvas);
const elementGL: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(tempGLCanvas.id);
gl = elementGL.getContext('webgl2');

// console.log('before:', gl, elementGL, tempGLCanvas);

const tempCCanvas = document.createElement('canvas');
tempCCanvas.id = 'temp-canvas';
tempCCanvas.width = 1;
tempCCanvas.height = 1;
document.getElementsByTagName('body')[0].appendChild(tempCCanvas);
const elementC: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(tempCCanvas.id);
c = elementC.getContext('2d');



export function rebindGL (DOMParent: HTMLElement, currentCanvasId: string, nextCanvasId: string, width: number, height: number): void {
  // Remove old canvas
  gl = null;
  const child = document.getElementById(currentCanvasId);
  document.body.removeChild(child);

  // Canvas created by Component template
  const canvas: HTMLCanvasElement = DOMParent.getElementsByTagName('canvas')[0];
  canvas.id = nextCanvasId;
  canvas.width = width;
  canvas.height = height;
  DOMParent.appendChild(canvas);
  gl = canvas.getContext('webgl2');
  // console.log('after:', gl, canvas, tempGLCanvas);
}

export function rebindC (DOMParent: HTMLElement, currentCanvasId: string, nextCanvasId: string, width: number, height: number): void {
  // Remove old canvas
  c = null;
  const child = document.getElementById(currentCanvasId);
  document.body.removeChild(child);

  // Canvas created by Component template
  const canvas: HTMLCanvasElement = DOMParent.getElementsByTagName('canvas')[0];
  canvas.id = nextCanvasId;
  canvas.width = width;
  canvas.height = height;
  DOMParent.appendChild(canvas);
  c = canvas.getContext('2d');
}
