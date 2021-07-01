let totalTimes = 1

export function splitText({target, delimeter = ' ', append = true, times = 1}) {
  if (typeof times !== 'number') throw Error('times must be a number')

  totalTimes = times >= 1 ? times : totalTimes

  const words = split(target.innerHTML.toString().trim(), delimeter)

  let innerHTML = ''

  words.forEach((line) => {
    if (line.indexOf('<br>') === -1) {
      innerHTML += parseLine(line)
      return
    }

    const lines = line.split('<br>')
    lines.forEach(
      (line, index) =>
        (innerHTML += index > 0 ? '<br>' + parseLine(line) : parseLine(line)),
    )
  })

  target.innerHTML = innerHTML

  const spans = target.querySelectorAll('span')

  if (append) {
    spans.forEach((span) => {
      const isSingleLetter = span.textContent.length === 1
      const isNotEmpty = span.innerHTML.trim() !== ''
      const isNotAndCharacter = span.textContent !== '&'
      const isNotDashCharacter = span.textContent !== '-'

      isSingleLetter &&
        isNotEmpty &&
        isNotAndCharacter &&
        isNotDashCharacter &&
        (span.innerHTML = `${span.textContent}&nbsp;`)
    })
  }

  totalTimes -= 1

  if (totalTimes === 0) return spans

  splitText({
    target,
    delimeter,
    append,
  })
}

export function calculate(spans) {
  const lines = []
  let words = []

  let position = spans[0].offsetTop

  spans.forEach((span, index) => {
    if (span.offsetTop === position) words.push(span)

    if (span.offsetTop !== position) {
      lines.push(words)
      words = []
      words.push(span)
      position = span.offsetTop
    }

    if (index + 1 === spans.length) lines.push(words)
  })

  return lines
}

function split(text, delimeter) {
  const splits = text.split('<br>')

  let words = []

  splits.forEach((item, index) => {
    if (index > 0) words.push('<br>')

    words = words.concat(item.split(delimeter))

    let isLink = false
    let link = ''

    const innerHTML = []

    words.forEach((word) => {
      if (!isLink && (word.includes('<a') || word.includes('<strong'))) {
        link = ''
        isLink = true
      }

      link += isLink ? ` ${word}` : ''

      if (isLink && (word.includes('/a>') || word.includes('/strong>'))) {
        innerHTML.push(link)
        link = ''
      }

      if (!isLink && link === '') innerHTML.push(word)

      if (isLink && (word.includes('/a>') || word.includes('/strong>')))
        isLink = false
    })

    words = innerHTML
  })

  return words
}

function parseLine(line) {
  line = line.trim()

  if (line === '' || line === ' ') return line

  return line === '<br>'
    ? '<br>'
    : `<span>${line}</span>` + (line.length > 1 ? ' ' : '')
}
