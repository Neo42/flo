import * as ogl from 'ogl'
import Home from './Home'

export class Canvas {
  constructor() {
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createHome()
  }

  createRenderer() {
    this.renderer = new ogl.Renderer()
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new ogl.Camera(this.gl)
    this.camera.position.z = 5
  }

  createScene() {
    this.scene = new ogl.Transform()
  }

  createHome() {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    })
  }

  update() {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    })
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      width,
      height,
    }

    if (!this.home) return

    this.home.onResize({sizes: this.sizes})
  }
}
