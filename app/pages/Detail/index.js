import Page from 'classes/Page'

export class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      root: '.detail',
      targets: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}
