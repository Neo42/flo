import EventEmitter from 'events'
import {isPlainObject, isValidHtml} from '../utils'

const doesExistInDocument = (selectedElement) =>
  !!document.querySelectorAll(selectedElement).length

export default class Component extends EventEmitter {
  constructor(
    {rootSelector, selectedElements} = {
      rootSelector: null,
      selectedElements: null,
    },
  ) {
    if (rootSelector === null || selectedElements === null) {
      throw new Error('Component ReferenceError: Init arguments missing')
    }

    if (!isPlainObject(selectedElements)) {
      throw new Error(
        `Component TypeError: selectedElements must be a plain object.`,
      )
    }

    super()

    this.rootSelector = rootSelector
    this.selectedElements = {...selectedElements}
    this.create()
  }

  create() {
    this.rootElement = document.querySelector(this.rootSelector)
    this.elements = {}

    const selectedElementKeys = Object.keys(this.selectedElements)

    selectedElementKeys.forEach((key) => {
      const selectedElement = this.selectedElements[key]

      if (isValidHtml(selectedElement)) {
        this.elements[key] = selectedElement
      } else if (typeof selectedElement === 'string') {
        !doesExistInDocument(selectedElement) &&
          console.warn(`Elements for ${selectedElement} not found.`)

        this.elements[key] = doesExistInDocument(selectedElement)
          ? document.querySelector(selectedElement)
          : null
      } else {
        throw new Error(
          `TypeError: ${selectedElement} is not a HTMLElement, a NodeList, or a string.`,
        )
      }
    })
  }

  addEventListeners() {}

  removeEventListeners() {}
}
