import {Page} from 'classes'

export class Detail extends Page {
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
