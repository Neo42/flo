export function checkMissingArgs({root, targets, id}) {
  if (!root || !targets || !id) {
    const missingArgNames = Object.entries({
      root,
      targets,
      id,
    })
      .filter(([_, value]) => value === undefined)
      .map(([key]) => key)

    console.warn(
      `ReferenceError: UI constructor missing arguments ${missingArgNames}`,
    )
  }
}
