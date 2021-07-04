import gsap from 'gsap'
import {Widget} from 'classes'
import {COLOR_ARSENIC, COLOR_LINEN} from 'colors'

export class Navigation extends Widget {
  constructor({template}) {
    super({
      root: '.navigation',
      targets: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
      },
    })

    this.onChange(template)
  }

  onChange(template) {
    this.is = (route) => template === route

    gsap.to(this.rootElement, {
      color: this.is('about') ? COLOR_ARSENIC : COLOR_LINEN,
      duration: 1.5,
    })

    gsap.to(this.targetElements.items[0], {
      autoAlpha: this.is('about') ? 1 : 0,
      delay: this.is('about') ? 0.75 : 0,
      duration: 0.75,
    })

    gsap.to(this.targetElements.items[1], {
      autoAlpha: this.is('about') ? 0 : 1,
      delay: this.is('about') ? 0 : 0.75,
      duration: 0.75,
    })
  }
}
