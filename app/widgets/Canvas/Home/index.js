import gsap from 'gsap'
import * as ogl from 'ogl'
import Media from './Media'

export default class Home {
  constructor({gl, scene, sizes}) {
    this.gl = gl
    this.sizes = sizes
    this.group = new ogl.Transform()

    this.galleryElement = document.querySelector('.home__gallery')
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
    this.scroll.x = this.x.target = 0
    this.scroll.y = this.y.target = 0
    this.galleryBounds = this.galleryElement.getBoundingClientRect()
    this.sizes = sizes
    this.medias.forEach((media) =>
      media.onResize({
        sizes,
        scroll: this.scroll,
      }),
    )
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

  onWheel({pixelX, pixelY}) {
    this.x.target += pixelX
    this.y.target += pixelY
  }

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

    if (this.scroll.x < this.x.current) {
      this.x.direction = 'right'
    } else if (this.scroll.x > this.x.current) {
      this.x.direction = 'left'
    }

    if (this.scroll.y < this.y.current) {
      this.y.direction = 'down'
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = 'up'
    }

    this.gallerySizes = {
      width: (this.galleryBounds.width / window.innerWidth) * this.sizes.width,
      height:
        (this.galleryBounds.height / window.innerHeight) * this.sizes.height,
    }

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current

    this.medias.forEach((media) => {
      const resetPointX = (this.sizes.width + media.mesh.scale.x) / 2
      const resetPointY = (this.sizes.height + media.mesh.scale.y) / 2

      if (this.x.direction === 'left' && media.mesh.position.x < -resetPointX) {
        media.extra.x += this.gallerySizes.width

        media.mesh.rotation.x = gsap.utils.random(
          0.03 * -Math.PI,
          0.03 * Math.PI,
        )
      } else if (
        this.x.direction === 'right' &&
        media.mesh.position.x > resetPointX
      ) {
        media.extra.x -= this.gallerySizes.width

        media.mesh.rotation.x = gsap.utils.random(
          0.03 * -Math.PI,
          0.03 * Math.PI,
        )
      }

      if (this.y.direction === 'up' && media.mesh.position.y > resetPointY) {
        media.extra.y -= this.gallerySizes.height

        media.mesh.rotation.x = gsap.utils.random(
          0.03 * -Math.PI,
          0.03 * Math.PI,
        )
      } else if (
        this.y.direction === 'down' &&
        media.mesh.position.y < -resetPointY
      ) {
        media.extra.y += this.gallerySizes.height

        media.mesh.rotation.x = gsap.utils.random(
          0.03 * -Math.PI,
          0.03 * Math.PI,
        )
      }

      media.update(this.scroll)
    })
  }
}
