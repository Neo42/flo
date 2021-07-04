import {Widget} from 'classes'

export class AsyncImage extends Widget {
  constructor({root, targets}) {
    super({root, targets})
    this.createObserver()
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(({isIntersecting}) => {
        if (!isIntersecting) return
        if (this.rootElement.src) return

        this.rootElement.src = this.rootElement.getAttribute('data-src')
        this.rootElement.onload = this.rootElement.classList.add('loaded')
      })
    })

    this.observer.observe(this.rootElement)
  }
}
