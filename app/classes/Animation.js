import Widget from 'classes/Widget'

export default class Animation extends Widget {
  constructor({root, targets}) {
    super({root, targets})
    this.createObserver()
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(({isIntersecting}) =>
        isIntersecting ? this.animateIn() : this.animateOut(),
      )
    })

    this.observer.observe(this.root)
    this.animateOut
  }

  animateIn() {
    if (this.isAnimateIn) return
    this.isAnimateIn = true
  }

  animateOut() {
    this.isAnimateIn = false
  }
}
