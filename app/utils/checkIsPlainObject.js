export function checkIsPlainObject(thing, thingName) {
  if (!isPlainObject(thing))
    throw Error(`TypeError: ${thingName} is not a plain object.`)
}

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
