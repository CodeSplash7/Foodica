export function getButtonPages(currentBlogPage: number, pagesCount: number) {
  let result: (number | null)[] = [];
  result.push(1);
  for (let i = 1; i <= pagesCount; i++) {
    if (i === currentBlogPage) {
      result.push(i);
    } else if ([i - 1, i + 1].includes(currentBlogPage)) {
      result.push(i);
    } else result.push(null);
  }
  result.push(pagesCount);
  return result;
}
