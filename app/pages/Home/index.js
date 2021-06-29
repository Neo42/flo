import {Page} from 'classes'

export class Home extends Page {
  constructor() {
    super({
      id: 'home',
      rootSelector: '.home',
      selectedElements: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
