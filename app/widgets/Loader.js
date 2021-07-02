import GSAP from 'gsap'
import Widget from 'classes/Widget'
import {splitText} from 'utils'

export class Loader extends Widget {
  constructor() {
    super({
      root: '.loader',
      targets: {
        text: '.loader__text',
        number: '.loader__number',
        numberText: '.loader__number__text',
        images: document.querySelectorAll('img'),
      },
    })

    splitText({
      target: this.targetElements.text,
      delimeter: '<br>',
      times: 2,
    })

    this.targetElements.textSpans =
      this.targetElements.text.querySelectorAll('span span')
    this.length = 0
    this.percent = 0
    this.createLoader()
  }

  createLoader() {
    this.targetElements.images.forEach((image) => {
      image.onloaded = this.onLoaded()
      image.src = image.getAttribute('data-src')
    })
  }

  onLoaded() {
    this.length += 1
    this.percent = this.length / this.targetElements.images.length
    this.targetElements.numberText.innerHTML = `${Math.round(
      this.percent * 100,
    )}%`

    if (this.percent === 1) this.onLoadingCompleted()
  }

  onLoadingCompleted() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      })
      this.animateOut.to(this.targetElements.textSpans, {
        autoAlpha: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%',
      })
      this.animateOut.to(
        this.targetElements.numberText,
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
