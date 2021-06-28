import Page from 'classes/Page'

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
