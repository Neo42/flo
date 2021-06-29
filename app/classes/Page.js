import {Generic} from 'classes'
import GSAP from 'gsap'

export class Page extends Generic {
  constructor({rootSelector, selectedElements, id}) {
    if (!id) throw new Error('Page id missing.')

    super({rootSelector, selectedElements})
    this.id = id
  }

  show() {
    console.trace()
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
