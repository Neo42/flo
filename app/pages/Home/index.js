import {Page} from 'classes'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      rootSelector: '.home',
      selectedElements: {
        link: '.home__link',
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
