const PostConstants = require('../constants/post_constants');
const PostApiUtil = require('../util/post_api_util');
const dispatcher = require('../dispatcher/dispatcher');

const PostActions = {
  fetchAllPosts: function() {
    PostApiUtil.fetchAllPosts(this.receiveAllPosts)
  },

  fetchPosts: function(limit, offset, options) {
    const callback = offset ? this.appendPosts : this.receiveAllPosts;

    if (options) {
      switch (options.sortOption) {
        case "Most Recent":
        PostApiUtil.fetchMostRecentPosts(callback, limit, offset, options.filterOption);
        break;
        case "Popularity":
        default:
        PostApiUtil.fetchMostPopularPosts(callback, limit, offset, options.filterOption);
      }
    } else {
      PostApiUtil.fetchPosts(callback, limit, offset);
    }
  },

  fetchSinglePost: function(id) {
    PostApiUtil.fetchSinglePost(id, this.receiveSinglePost)
  },

  receiveAllPosts: function(posts) {
    dispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  },

  createPost(post) {
    PostApiUtil.createPost(post, this.receiveSinglePost);
  },

  receiveSinglePost: function(post) {
    dispatcher.dispatch({
      actionType: PostConstants.POST_RECEIVED,
      post: post
    });
  },

  appendPosts: function(posts) {
    dispatcher.dispatch({
      actionType: PostConstants.APPEND_POSTS,
      posts: posts
    });
  },

  createComment(comment) {
    PostApiUtil.createComment(comment, this.receiveSinglePost);
  }
}

module.exports = PostActions;
