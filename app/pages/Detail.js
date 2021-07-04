import {Button, Page} from 'classes'

export class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      root: '.detail',
      targets: {
        button: '.detail__button',
      },
    })
  }
}
