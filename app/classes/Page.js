import GSAP from 'gsap'
import {isPlainObject, isValidHtml} from '../utils'

const doesExistInDocument = (selectedElement) =>
  !!document.querySelectorAll(selectedElement).length

export class Page {
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

  show() {
    console.log('show')
    return new Promise((resolve) =>
      GSAP.fromTo(
        this.rootElement,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          onComplete: resolve,
        },
      ),
    )
  }

  hide() {
    return new Promise((resolve) =>
      GSAP.to(this.rootElement, {
        autoAlpha: 0,
        onComplete: resolve,
      }),
    )
  }
}
