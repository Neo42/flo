import gsap from 'gsap'
import * as ogl from 'ogl'
import Media from './Media'

export default class Home {
  constructor({gl, scene, sizes}) {
    this.gl = gl
    this.sizes = sizes
    this.group = new ogl.Transform()
    this.images = document.querySelectorAll('.home__gallery__media__image')

    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }
    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }

    this.scroll = {
      x: 0,
      y: 0,
    }

    this.scrollCurrent = {
      x: 0,
      y: 0,
    }

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
          index,
          root: image,
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

  onTouchDown({x, y}) {
    this.scrollCurrent.x = this.scroll.x
    this.scrollCurrent.y = this.scroll.y
  }

  onTouchMove({x, y}) {
    this.x.target = this.scrollCurrent.x - (x.start - x.end)
    this.y.target = this.scrollCurrent.y - (y.start - y.end)
  }

  onTouchUp({x, y}) {}

  update() {
    this.x.current = gsap.utils.interpolate(
      this.x.current,
      this.x.target,
      this.x.lerp,
    )
    this.y.current = gsap.utils.interpolate(
      this.y.current,
      this.y.target,
      this.y.lerp,
    )

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current

    this.medias.forEach((media) => media.update(this.scroll))
  }
}
