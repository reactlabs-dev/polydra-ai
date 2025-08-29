/**
 * Mock for Three.js library
 * Provides minimal implementations for testing WebGL components
 */

// Mock basic Three.js classes
export class Scene {
  add = jest.fn();
  remove = jest.fn();
}

export class PerspectiveCamera {
  position = { x: 0, y: 0, z: 5 };
  
  constructor(public fov: number, public aspect: number, public near: number, public far: number) {}
}

export class WebGLRenderer {
  domElement = document.createElement('canvas');
  
  constructor(options?: any) {}
  
  setSize = jest.fn();
  render = jest.fn();
  dispose = jest.fn();
}

export class BoxGeometry {
  constructor(public width: number, public height: number, public depth: number) {}
}

export class MeshBasicMaterial {
  constructor(public options?: any) {}
}

export class Mesh {
  rotation = { x: 0, y: 0, z: 0 };
  position = { x: 0, y: 0, z: 0 };
  
  constructor(public geometry: any, public material: any) {}
}

export class CanvasTexture {
  constructor(public canvas: HTMLCanvasElement) {}
}

// Mock the default export
const THREE = {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  CanvasTexture
};

export default THREE;