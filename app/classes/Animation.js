import {Widget} from 'classes'

export class Animation extends Widget {
  constructor({root, targets}) {
    super({root, targets})

    this.createObserver()
    this.animateOut()
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(({isIntersecting}) =>
        isIntersecting ? this.animateIn() : this.animateOut(),
      )
    })

    this.observer.observe(this.rootElement)
    this.animateOut()
  }

  animateIn() {
    if (this.isAnimateIn) return
    this.isAnimateIn = true
  }

  animateOut() {
    this.isAnimateIn = false
  }
}
