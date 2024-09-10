export function usernameToUrl(username: string) {
  return username.toLowerCase().split(" ").join("-").split("&").join("%26");
}

export function urlNameToUsername(urlName: string) {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ').split("%26").join("&")
}
