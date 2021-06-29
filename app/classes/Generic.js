import EventEmitter from 'events'
import {isPlainObject, isValidHtml} from '../utils'

const doesExistInDocument = (selectedElement) =>
  !!document.querySelectorAll(selectedElement).length

export class Generic extends EventEmitter {
  constructor({rootSelector, selectedElements}) {
    if (!rootSelector || !selectedElements) {
      const missingArgNames = Object.entries({
        rootSelector,
        selectedElements,
      })
        .filter(([_, value]) => value === undefined)
        .map(([key]) => key)

      console.warn(
        `ReferenceError: UI constructor missing arguments ${missingArgNames}`,
      )
      console.trace()
    }

    if (!isPlainObject(selectedElements)) {
      throw new Error(`TypeError: UI selectedElements must be a plain object.`)
      console.trace()
    }

    super()

    this.rootSelector = rootSelector
    this.selectedElements = selectedElements
    this.create()
  }

  create() {
    this.rootElement = document.querySelector(this.rootSelector)
    this.elements = {}

    const selectedElementKeys = Object.keys(this.selectedElements)

    selectedElementKeys.forEach((key) => {
      const selectedElement = this.selectedElements[key]

      if (!isValidHtml(selectedElement) && !typeof selectedElement === 'string')
        throw new Error(
          `TypeError: ${selectedElement} is not a HTMLElement, a NodeList, or a string.`,
        )

      if (typeof selectedElement === 'string') {
        !doesExistInDocument(selectedElement) &&
          console.warn(`Elements for ${selectedElement} not found.`)

        this.elements[key] = doesExistInDocument(selectedElement)
          ? document.querySelector(selectedElement)
          : null
      } else this.elements[key] = selectedElement
    })
  }
}
