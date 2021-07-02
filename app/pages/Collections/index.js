import {Page} from 'classes'

export class Collections extends Page {
  constructor() {
    super({
      id: 'collections',
      root: '.collections',
      targets: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
