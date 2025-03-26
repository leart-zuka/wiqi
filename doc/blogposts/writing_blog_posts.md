---
id: "writing_blog_posts"
date: "2025-03-26"
---

# writing_blog_posts

## Metadata

Each blog posts has some lines at the very top of the file that won't get displayed when a user clicks on the blog posts, but are important in order to set the title, date,... of the blog post in the card view and some other places.
The piece of metadata looks like this and **MUST** be present in order for the blog post to appear in the card selection, otherwise your beautiful post won't get displayed properly :( 
The lines looks like this

```md
---
title: "Title of the blog post"
subtitle: "Subtitle of the blog post"
author: "Your name (good movie)"
date: "Date of when the blog post was written (format: DD-MM-YYYY)"
---
```

It should go without saying that the title and subtitle should be in the right language of the blogpost. For now we only support english and german

## Latex

As most of our posts are based on concepts in physics, we of course need to be able to use equations (sometimes). 
As its standard in this field, we'll be using Latex, which is every physicists best and worst friend. 
If you're familiar with Latex you should have no problems writing any mathematical equations, and I won't really be going over the Latex syntax in here. 
What I want to focus on is how one is able to use Latex inside of their blog post and make it look the way they intend it to look.
In order to display inline Latex expressions simply use the regular notation ${your_equation_or_whatever}$.
Should you however want to display your expression in a seperate blog in a new line, you'll have to make sure that each double dollar quote (`$$`) is in its own line, otherwise your expression won't be in a seperate line. So:
```md
**Will be displayed in a separate line**:
$$
\alpha=\beta
$$

**Will be displayed in line**:
$$\alpha=\beta$$
```

## Finishing up your blog post

Should you be done writing your blog post, please always make sure to double check if everything is rendered correctly to both ensure an easy time for the person reviewing your PR but most importantly that the user who is reading your blog post has a good and easy time reading and understanding what you've written.

So after finishing up writing your blog post, or even better while you're writing your blog post, start up the dev server (check in the readme on how to do that), make sure that everything looks as you intended, and then open up your PR.

