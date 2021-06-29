import {Page} from 'classes'

export default class Collections extends Page {
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
