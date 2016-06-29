## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * PostsIndex
    * Search
    * PostIndexItem
    * **PostForm**
  * PostShow
    * ImagesIndex
      * ImageDetail
    * **CommentsIndex**
      * CommentForm
      * CommentIndexItem
      * **CommentDetail**
        * CommentEditArea


## Routes

* **component:** `App` **path:** `/`
  * **component:** `PostsIndex` **path:** index
  * **component:** `PostShow` **path:** `posts/:postId`
    * **component:** `ImagesIndex` **path:** `posts/:postId/images`
  * **component:** `CommentsIndex` **path:** `posts/:postId/comments`
    * **component:** `CommentDetail` **path:** `comments/:CommentId`

