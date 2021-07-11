import normalizeWheel from 'normalize-wheel'

import {About, Collections, Detail, Home} from 'pages'
import {Canvas, Loader, Navigation} from 'widgets'

class App {
  constructor() {
    this.createContent()
    this.createLoader()
    this.createPages()
    this.createNavigation()
    this.createCanvas()
    this.onResize()
    this.addEventListeners()
    this.listenToAllLinks()
    this.update()
  }

  createLoader() {
    this.loader = new Loader()
    this.loader.create()
    this.loader.once('completed', this.onLoaded.bind(this))
  }

  createNavigation() {
    this.navigation = new Navigation({template: this.template})
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages() {
    this.pages = {
      home: new Home(),
      collections: new Collections(),
      detail: new Detail(),
      about: new About(),
    }
    this.page = this.pages[this.template]
    this.page.create()

    this.page.rootElement
      .querySelectorAll('img')
      .forEach((img) => img.classList.add('loaded'))

    this.page.show()
  }

  createCanvas() {
    this.canvas = new Canvas()
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    window.addEventListener('wheel', this.onWheel.bind(this))
  }

  listenToAllLinks() {
    const links = document.querySelectorAll('a')

    links.forEach(
      (link) =>
        (link.onclick = (event) => {
          event.preventDefault()
          this.onChange(link.href)
        }),
    )
  }

  onTouchDown(event) {
    this.canvas.onTouchDown(event)
  }

  onTouchMove(event) {
    this.canvas.onTouchMove(event)
  }

  onTouchUp(event) {
    this.canvas.onTouchUp(event)
  }

  async onChange(url) {
    await this.page.hide()

    const response = await window.fetch(url)
    if (!response.ok) throw Error(response)

    const htmlText = await response.text()
    const content = new DOMParser()
      .parseFromString(htmlText, 'text/html')
      .body.querySelector('.content')

    this.template = content.getAttribute('data-template')
    this.navigation.onChange(this.template)

    this.content.setAttribute('data-template', this.template)
    this.content.innerHTML = content.innerHTML

    this.page = this.pages[this.template]
    this.page.create()
    this.onResize()
    this.page.show()

    this.listenToAllLinks()
  }

  onLoaded() {
    this.loader.destroy()
  }

  onResize() {
    this.page.onResize()
    this.canvas.onResize()
  }

  onWheel(event) {
    const normalizedWheel = normalizeWheel(event)
    this.page.onWheel(normalizedWheel)
    this.canvas.onWheel(normalizedWheel)
  }

  update() {
    this.page.update()
    this.canvas.update()
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
