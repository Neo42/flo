export function isValidHtml(selectedElement) {
  return (
    selectedElement instanceof window.HTMLElement ||
    selectedElement instanceof NodeList ||
    Array.isArray(selectedElement)
  )
}
