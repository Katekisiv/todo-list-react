export const deepCloning = (object: any) => {
  if (object === null) {
    return null
  }

  if (typeof object !== 'object') {
    return object
  }

  const newObject = Array.isArray(object) ? [] : {}
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    newObject[key] =
      typeof object[key] === 'object' ? deepCloning(object[key]) : object[key]
  })

  return newObject
}
