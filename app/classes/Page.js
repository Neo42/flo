import GSAP from 'gsap'
import Prefix from 'prefix'
import {Generic} from 'classes'

export class Page extends Generic {
  constructor({rootSelector, selectedElements, id}) {
    if (!id) throw Error('Page id missing.')

    super({rootSelector, selectedElements})
    this.id = id
    this.transformPrefix = Prefix('transform')
    this.onMouseWheel = this.onMouseWheel.bind(this)

    this.create()
  }

  create() {
    super.create()
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }
    this.onResize()
  }

  show() {
    return new Promise((resolve) => {
      this.animationIn = GSAP.timeline()

      this.animationIn.fromTo(
        this.rootElement,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        },
      )

      this.animationIn.call(() => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.rootElement, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  onMouseWheel({deltaY}) {
    this.scroll.target += deltaY
  }

  onResize() {
    if (!this.elements.wrapper) return
    this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheel)
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheel)
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target,
    )

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1,
    )

    this.scroll.current = this.scroll.current < 0.01 ? 0 : this.scroll.current

    this.elements.wrapper.style[
      this.transformPrefix
    ] = `translateY(-${this.scroll.current}px)`
  }
}
