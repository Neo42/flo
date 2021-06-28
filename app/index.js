import Home from 'pages/Home'
import Collections from 'pages/Collections'
import Detail from 'pages/Detail'
import About from 'pages/About'
import Loader from 'components/Loader'

class App {
  constructor() {
    this.createLoader()
    this.createContent()
    this.createPages()
    this.listenToLinks()
  }

  createLoader() {
    this.loader = new Loader()
    this.loader.once('completed', this.onLoaded.bind(this))
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
  }

  listenToLinks() {
    const links = document.querySelectorAll('a')

    links.forEach((link) => {
      link.onclick = (e) => {
        e.preventDefault()
        this.onChange(link.href)
      }
    })
  }

  async onChange(url) {
    await this.page.hide()

    const response = await window.fetch(url)
    if (!response.ok) throw new Error(response)

    const htmlText = await response.text()
    const content = new DOMParser()
      .parseFromString(htmlText, 'text/html')
      .body.querySelector('.content')

    this.template = content.getAttribute('data-template')
    this.content.setAttribute('data-template', this.template)
    this.content.innerHTML = content.innerHTML

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()

    this.listenToLinks()
  }

  onLoaded() {
    this.loader.destroy()
    this.page.show()
  }
}

new App()
