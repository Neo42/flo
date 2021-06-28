import Page from 'classes/Page'

export default class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      rootSelector: '.detail',
      selectedElements: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
