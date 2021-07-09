import * as ogl from 'ogl'
import fragment from 'shaders/plain_fragment.glsl'
import vertex from 'shaders/plain_vertex.glsl'

export default class Media {
  constructor({root, geometry, gl, scene, sizes, index}) {
    this.gl = gl
    this.index = index
    this.root = root
    this.scene = scene
    this.sizes = sizes
    this.geometry = geometry

    this.createTexture()
    this.createProgram()
    this.createMesh()
  }

  createTexture() {
    this.texture = new ogl.Texture(this.gl)
    this.image = new Image()
    this.image.crossOrigin = 'anonymous'
    this.image.src = this.root.getAttribute('data-src')
    this.image.onload = () => {
      this.texture.image = this.image
      this.mesh.setParent(this.scene)
    }
  }

  createProgram() {
    this.program = new ogl.Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: {value: this.texture},
      },
    })
  }

  createMesh() {
    this.mesh = new ogl.Mesh(this.gl, {
      program: this.program,
      geometry: this.geometry,
    })

    this.mesh.setParent(this.scene)
  }

  createBounds({sizes}) {
    this.sizes = sizes
    this.bounds = this.root.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()
  }

  updateScale() {
    this.widthRatio = this.bounds.width / window.innerWidth
    this.heightRatio = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.sizes.width * this.widthRatio
    this.mesh.scale.y = this.sizes.height * this.heightRatio
  }

  updateX(x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth
    this.mesh.position.x =
      -this.sizes.width / 2 + this.mesh.scale.x / 2 + this.x * this.sizes.width
  }

  updateY(y = 0) {
    this.y = (this.bounds.top + y) / window.innerHeight
    this.mesh.position.y =
      this.sizes.height / 2 - this.mesh.scale.y / 2 - this.y * this.sizes.height
  }

  update(scroll) {
    this.updateX(scroll.x)
    this.updateY(scroll.y)
  }

  onResize({sizes}) {
    this.createBounds({sizes})
  }
}
