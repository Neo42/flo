import GSAP from 'gsap'
import Animation from 'classes/Animation'

export class HighlightAnimation extends Animation {
  constructor({root, targets}) {
    super({root, targets})
  }

  animateIn() {
    super.animateIn()

    this.timelineIn = GSAP.timeline({
      delay: 0.5,
    })

    this.timelineIn.fromTo(
      this.root,
      {
        autoAlpha: 0,
        scale: 1.2,
      },
      {
        autoAlpha: 1,
        duration: 1.5,
        ease: 'expo.out',
        scale: 1.0,
      },
    )
  }

  animateOut() {
    super.animateOut()

    GSAP.set(this.root, {
      autoAlpha: 0,
    })
  }
}
