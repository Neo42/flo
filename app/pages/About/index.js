import {Page} from 'classes'

export class About extends Page {
  constructor() {
    super({
      id: 'about',
      root: '.about',
      targets: {
        navigation: document.querySelector('.navigation'),
        wrapper: '.about__wrapper',
      },
    })
  }
}
