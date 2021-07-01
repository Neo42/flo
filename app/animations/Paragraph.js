import GSAP from 'gsap'
import Animation from 'classes/Animation'
import {calculate, splitText} from 'utils'

export class ParagraphAnimation extends Animation {
  constructor({root, targets}) {
    super({root, targets})

    this.titleSpans = splitText({
      target: this.root,
    })
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.5,
    })

    this.timelineIn.set(this.root, {autoAlpha: 1})

    this.titleLines &&
      this.titleLines.forEach((line, index) => {
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
    GSAP.set(this.root, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.titleLines = calculate(this.titleSpans)
  }
}
