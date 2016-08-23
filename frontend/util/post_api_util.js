const SearchConstants = require('../constants/search_constants');

const PostApiUtil = {
  fetchAllPosts: function(callback) {
    $.ajax({
      url: "api/posts",
      success: function(resp) {
        callback(resp);
      }
    });
  },

  fetchPosts: function(callback, limit, offset) {
    $.ajax({
      url: "api/posts",
      data: { limit: limit, offset: offset },
      success: function(posts) {
        callback(posts);
      }
    });
  },

  fetchMostPopularPosts: function(callback, limit, offset, tag) {
    $.ajax({
      url: "api/posts/most_popular",
      data: buildData(limit, offset, tag),
      success: function(posts) {
        callback(posts);
      }
    });
  },

  fetchMostRecentPosts: function(callback, limit, offset, tag) {
    $.ajax({
      url: "api/posts/most_recent",
      data: buildData(limit, offset, tag),
      success: function(posts) {
        callback(posts);
      }
    });
  },

  fetchHighestScoringPosts: function(callback, limit, offset, tag) {
    $.ajax({
      url: "api/posts/highest_scoring",
      data: buildData(limit, offset, tag),
      success: function(posts) {
        callback(posts);
      }
    });
  },

  fetchSinglePost: function(id, callback) {
    $.ajax({
      url: "api/posts/" + id,
      success: function(resp) {
        callback(resp);
      }
    });
  },

  createPost: function(post, callback) {
    $.ajax({
      url: "api/posts",
      method: "POST",
      data: { post: post },
      success: function(resp) {
        callback(resp);
      }
    });
  },

  createComment: function(comment, postId, callback) {
    $.ajax({
      url: "api/comments",
      method: "POST",
      data: { comment: comment },
      success: function(resp) {
        callback(resp, postId);
      }
    });
  }
};

function buildData(limit, offset, tag) {
  return (tag === SearchConstants.MOST_VIRAL ?
    { limit: limit, offset: offset } :
    { limit: limit, offset: offset, tag: tag })
}

module.exports = PostApiUtil;
