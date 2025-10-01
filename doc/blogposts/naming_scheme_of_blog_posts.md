---
id: "naming_scheme_of_blog_posts"
date: "2025-03-26"
---

# naming_scheme_of_blog_posts

Blog posts come in the form of `.mdx` files.

The general schema of the file names of our blog posts are `{fileName}.mdx`.

There are certain rules when it comes to the file names:

- No special characters (`.,$!><#@"'{}[]()^&%` you get the point) in the file name as it can read to unexpected behaviors on different systems
- No extra spaces in between the words and/or at end or beginning of the file name as it can lead to unexpected behavior on different systems
  - Should you deem it more fitting to have extra words in your file name, make sure to stick to a snake case naming scheme ([snake case](https://en.wikipedia.org/wiki/Snake_case))
- Stick to regular english letters, so no emojis, special characters like accents or "Umlaute", or whatnot
- Windows is very special and we need to respect that, so the file name mustn't be `aux` or `CON`, as it can't be used on Windows systems
