import gsap from 'gsap'
import {Animation} from 'classes'
import {calculate, splitText} from 'utils'

export class TitleAnimation extends Animation {
  constructor({root, targets}) {
    super({root, targets})

    splitText({
      target: this.root,
      times: 2,
    })

    this.titleSpans = this.root.querySelectorAll('span span')
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.5,
    })

    this.timelineIn.set(this.root, {autoAlpha: 1})

    this.titleLines &&
      this.titleLines.forEach((line, index) => {
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
    gsap.set(this.root, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.titleLines = calculate(this.titleSpans)
  }
}
