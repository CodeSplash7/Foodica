export function usernameToUrl(username: string) {
  return username.toLowerCase().split(" ").join("");
}

export function urlNameToUsername(urlName: string) {
  return urlName.toLowerCase().split(" ").join("-");
}
