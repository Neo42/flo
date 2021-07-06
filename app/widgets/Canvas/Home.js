import * as ogl from 'ogl'
import Media from './Media'

export default class Home {
  constructor({gl, scene}) {
    this.gl = gl
    this.group = new ogl.Transform()
    this.images = document.querySelectorAll('.home__gallery__media__image')

    this.createGeometry()
    this.createGallery()

    this.group.setParent(scene)
  }

  createGeometry() {
    this.geometry = new ogl.Plane(this.gl)
  }

  createGallery() {
    Array.from(this.images).map(
      (image, index) =>
        new Media({
          index,
          root: image,
          gl: this.gl,
          geometry: this.geometry,
          scene: this.group,
        }),
    )
  }
}
