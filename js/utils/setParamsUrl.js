export function setParamsUrl(param, value) {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(param, value)
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`

  return newUrl
}