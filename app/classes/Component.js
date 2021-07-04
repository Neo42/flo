import EventEmitter from 'events'
import {isValidHtml} from 'utils'

export class Component extends EventEmitter {
  constructor({root, targets}) {
    super()

    this.root = root
    this.targets = targets
  }

  create() {
    this.rootElement =
      this.root instanceof HTMLElement
        ? this.root
        : document.querySelector(this.root)

    this.targetElements = {}

    if (!this.targets) return

    const targetElementKeys = Object.keys(this.targets)

    targetElementKeys.forEach((key) => {
      const targetElement = this.targets[key]

      if (!isValidHtml(targetElement) && !typeof targetElement === 'string')
        throw Error(
          `TypeError: ${targetElement} is not a HTMLElement, a NodeList, or a string.`,
        )

      if (isValidHtml(targetElement)) {
        this.targetElements[key] = targetElement
      }

      if (typeof targetElement === 'string') {
        const targetElementCount =
          document.querySelectorAll(targetElement).length

        this.targetElements[key] =
          targetElementCount === 0
            ? null
            : targetElementCount === 1
            ? document.querySelector(targetElement)
            : document.querySelectorAll(targetElement)
      }
    })
  }
}
