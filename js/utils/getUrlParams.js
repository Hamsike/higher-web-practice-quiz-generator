export function getUrlParams(queryString, keys) {
  const urlParams = new URLSearchParams(queryString);
  const result = new Map()
  
  keys.forEach(key => {
    result.set(key, urlParams.get(key))
  })

  return result
}