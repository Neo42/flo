import * as ogl from 'ogl'
import fragment from 'shaders/plain_fragment.glsl'
import vertex from 'shaders/plain_vertex.glsl'

export default class Media {
  constructor({root, geometry, gl, scene, index}) {
    this.gl = gl
    this.index = index
    this.root = root
    this.scene = scene
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
    this.image.onload = () => (this.texture.image = this.image)
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
    this.mesh.position.x += this.index * this.mesh.scale.x
  }
}
