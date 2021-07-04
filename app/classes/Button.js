import {Widget} from 'classes'
import gsap from 'gsap'

export class Button extends Widget {
  constructor({root}) {
    super({root})

    this.path = this.rootElement.querySelector('path:last-child')
    this.pathLength = this.path.getTotalLength()

    this.timeline = gsap.timeline({paused: true})
    this.timeline.fromTo(
      this.path,
      {
        strokeDasharray: `${this.pathLength}  ${this.pathLength}`,
        strokeDashoffset: this.pathLength,
      },
      {
        strokeDasharray: `${this.pathLength}  ${this.pathLength}`,
        strokeDashoffset: 0,
      },
    )

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

    this.addEventListeners()
  }

  onMouseEnter() {
    this.timeline.play()
  }

  onMouseLeave() {
    this.timeline.reverse()
  }

  addEventListeners() {
    this.rootElement.addEventListener('mouseenter', this.onMouseEnter)
    this.rootElement.addEventListener('mouseleave', this.onMouseLeave)
  }
  removeEventListeners() {
    this.rootElement.removeEventListener('mouseenter', this.onMouseEnter)
    this.rootElement.removeEventListener('mouseleave', this.onMouseLeave)
  }
}
