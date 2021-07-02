import GSAP from 'gsap'
import Animation from 'classes/Animation'
import {calculate, splitText} from 'utils'

export class ParagraphAnimation extends Animation {
  constructor({root, targets}) {
    super({root, targets})

    this.textSpans = splitText({
      target: this.root,
    })
  }

  animateIn() {
    super.animateIn()

    this.timelineIn = GSAP.timeline({
      delay: 0.5,
    })

    this.timelineIn.set(this.root, {autoAlpha: 1})

    this.textLines &&
      this.textLines.forEach((line, index) => {
        this.timelineIn.fromTo(
          line,
          {
            autoAlpha: 0,
            y: '100%',
          },
          {
            autoAlpha: 1,
            delay: index * 0.2,
            duration: 1.5,
            ease: 'expo.out',
            y: '0%',
          },
          0,
        )
      })
  }

  animateOut() {
    super.animateOut()

    GSAP.set(this.root, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.textLines = calculate(this.textSpans)
  }
}
