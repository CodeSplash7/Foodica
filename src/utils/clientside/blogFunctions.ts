// export function redirectToCorrectBlog(blogSelected: Blog) {
//   const blogDate = new Date(blogSelected.creationDate);
//   redirect(
//     `/blogs/${blogDate.getFullYear()}/${
//       blogDate.getMonth() + 1
//     }/${blogDate.getDate()}/${blogSelected.title
//       .toLowerCase()
//       .split(" ")
//       .join("-")}`
//   );
// }
// export function checkForBlogName({ possibleName }: { possibleName: string }) {
//   const blogSelected = getBlogs().find(
//     (blog) => blog.title.toLowerCase().split(" ").join("-") === possibleName
//   );
//   if (blogSelected) {
//     redirectToCorrectBlog(blogSelected);
//   }
// }
