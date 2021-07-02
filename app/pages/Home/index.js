import {Page} from 'classes'

export class Home extends Page {
  constructor() {
    super({
      id: 'home',
      root: '.home',
      targets: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
