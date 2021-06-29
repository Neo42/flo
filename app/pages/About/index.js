import {Page} from 'classes'

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      rootSelector: '.about',
      selectedElements: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
