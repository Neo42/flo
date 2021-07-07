import * as ogl from 'ogl'
import Media from './Media'

export default class Home {
  constructor({gl, scene, sizes}) {
    this.gl = gl
    this.group = new ogl.Transform()
    this.images = document.querySelectorAll('.home__gallery__media__image')
    this.sizes = sizes

    this.createGeometry()
    this.createGallery()

    this.group.setParent(scene)
  }

  createGeometry() {
    this.geometry = new ogl.Plane(this.gl)
  }

  createGallery() {
    this.medias = Array.from(this.images).map(
      (image, index) =>
        new Media({
          root: image,
          index,
          gl: this.gl,
          geometry: this.geometry,
          scene: this.group,
          sizes: this.sizes,
        }),
    )
  }

  onResize({sizes}) {
    this.medias.forEach((media) => media.onResize({sizes}))
  }
}
