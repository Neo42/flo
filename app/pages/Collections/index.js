import {Page} from 'classes'

export class Collections extends Page {
  constructor() {
    super({
      id: 'collections',
      rootSelector: '.collections',
      selectedElements: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
