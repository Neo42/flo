import GSAP from 'gsap'
import {isPlainObject, isValidHtml} from 'utils/index'

const doesExist = (selectedElement) =>
  !!document.querySelectorAll(selectedElement).length

export default class Page {
  constructor(
    {rootSelector, selectedElements, id} = {
      rootSelector: null,
      selectedElements: null,
      id: null,
    },
  ) {
    if (rootSelector === null || selectedElements === null || id === null) {
      throw new Error('Page ReferenceError: Init arguments missing')
    }

    if (!isPlainObject(selectedElements)) {
      throw new Error(
        `Page TypeError: selectedElements must be a plain object.`,
      )
    }

    this.selectedElements = {...selectedElements}
    this.id = id
    this.rootSelector = rootSelector
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
        this.elements[key] = doesExist(selectedElement)
          ? document.querySelector(selectedElement)
          : null

        !doesExist(selectedElement) &&
          console.warn(`Elements for ${selectedElement} not found.`)
      } else {
        throw new Error(
          `TypeError: ${selectedElement} is not a HTMLElement, a NodeList, or a string.`,
        )
      }
    })
  }

  show() {
    return new Promise((resolve) =>
      GSAP.from(this.rootElement, {
        autoAlpha: 0,
        onComplete: resolve,
      }),
    )
  }

  hide() {
    return new Promise((resolve) =>
      GSAP.from(this.rootElement, {
        autoAlpha: 0,
        onComplete: resolve,
      }),
    )
  }
}
