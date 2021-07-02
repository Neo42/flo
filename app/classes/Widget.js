import Component from './Component'

export class Widget extends Component {
  constructor({root, targets}) {
    if (!root) {
      throw Error('Missing root')
    }
    super({root, targets})
  }
}
