import gsap from 'gsap'

class Color {
  change({backgroundColor, color}) {
    gsap.to(document.documentElement, {
      backgroundColor,
      color,
      duration: 1.5,
    })
  }
}

export const ColorManager = new Color()
