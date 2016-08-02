# Imagr

[Live link][heroku]

[heroku]: http://www.imagr.us

Imagr is an image gallery web application inspired by Imgur built using Ruby on Rails and Facebook's React.js. The front end leverages the Flux design pattern to deliver a fluid experience for the user.

Imagr is a great place to share experiences, thoughts, and interests. Users can create posts which other users can then vote and comment on.

## Create A Post

Found or made a funny image? Went on a trip to Nepal recently? Have something clever to say? Hop on Imagr on make a post about it! Making a post on Imagr is easy and the layout of images interspaced with narration makes story-telling even easier. If your post gets enough of a reaction, you might hit the front page!

![create]

## Browse

View, comment on, vote on, laugh about, and cry over other users' posts. The front page features the most popular recent posts, determined by users' voting and commenting, so hang around there and you'll never miss a viral post.

![post]

## Infinite Scroll

The posts gallery requests more posts from the database when you've reached the end of it. This prevents strain on the server as well as the client's side.

![index]

## Comment

Imagr is home to many thoughtful and funny people. Look for a worthy post and compete to get the top comment!

![comments]

## Future Direction

### User Pages

I would like to give users the option to view their personal pages, which might feature their created posts, favorite posts, and tally the votes their contributions have earned.

### Tagging

At the moment, the only information available to group posts by is in their titles. It'd be cool if posters or viewers could tag posts (eg funny, NBA) and then choose to view posts with those tags.

### Imgur Api

Imgur has an API which "exposes their entire infrastructure". If I can get past feeling guilty over 'stealing' content from people on Imgur, it'd be a cool thing to feature on my site.

[index]: ./docs/screenshots/index.png
[create]: ./docs/screenshots/create.png
[post]: ./docs/screenshots/post.png
[comments]: ./docs/screenshots/comments.png
