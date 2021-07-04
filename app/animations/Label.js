import gsap from 'gsap'
import {Animation} from 'classes'
import {calculate, splitText} from 'utils'

export class LabelAnimation extends Animation {
  constructor({root, targets}) {
    super({root, targets})

    this.labelSpans = splitText({
      target: this.root,
    })
  }

  animateIn() {
    super.animateIn()

    this.timelineIn = gsap.timeline({
      delay: 0.5,
    })

    this.timelineIn.set(this.root, {autoAlpha: 1})

    this.labelLines &&
      this.labelLines.forEach((line, index) => {
        this.timelineIn.fromTo(
          line,
          {
            y: '100%',
          },
          {
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

    gsap.set(this.root, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.labelLines = calculate(this.labelSpans)
  }
}
