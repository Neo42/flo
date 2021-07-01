import Page from 'classes/Page'

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
