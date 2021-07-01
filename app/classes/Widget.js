import Component from 'classes/Component'

export default class Widget extends Component {
  constructor({root, targets}) {
    if (!root) {
      throw Error('Missing root')
    }
    super({root, targets})
  }
}
