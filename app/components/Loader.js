import GSAP from 'gsap'
import {Component} from 'classes'
import {splitText} from '../utils'

export class Loader extends Component {
  constructor() {
    super({
      rootSelector: '.loader',
      selectedElements: {
        text: '.loader__text',
        number: '.loader__number',
        numberText: '.loader__number__text',
        images: document.querySelectorAll('img'),
      },
    })

    splitText({
      target: this.elements.text,
      delimeter: '<br>',
      times: 2,
    })

    this.elements.textSpans = this.elements.text.querySelectorAll('span span')
    this.length = 0
    this.percent = 0
    this.createLoader()
  }

  createLoader() {
    this.elements.images.forEach((image) => {
      image.onloaded = this.onLoaded()
      image.src = image.getAttribute('data-src')
    })
  }

  onLoaded() {
    this.length += 1
    this.percent = this.length / this.elements.images.length
    this.elements.numberText.innerHTML = `${Math.round(this.percent * 100)}%`

    if (this.percent === 1) this.onLoadingCompleted()
  }

  onLoadingCompleted() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      })

      this.animateOut.to(this.elements.textSpans, {
        autoAlpha: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%',
      })

      this.animateOut.to(
        this.elements.numberText,
        {
          autoAlpha: 0,
          duration: 1.5,
          ease: 'expo.out',
          stagger: 0.1,
          y: '100%',
        },
        '-=1.4',
      )

      this.animateOut.to(
        this.rootElement,
        {
          scaleY: 0,
          transformOrigin: '100% 100%',
          duration: 1.5,
          ease: 'expo.out',
        },
        '-=1',
      )

      this.animateOut.call((_) => {
        this.emit('completed')
      })
    })
  }

  destroy() {
    this.rootElement.parentNode.removeChild(this.rootElement)
  }
}
