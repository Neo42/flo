export function isValidHtml(targetElement) {
  return (
    targetElement instanceof HTMLElement ||
    targetElement instanceof NodeList ||
    Array.isArray(targetElement)
  )
}
