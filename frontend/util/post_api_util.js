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
    let data;
    if (tag === "Most Viral") {
      data = { limit: limit, offset: offset };
    } else {
      data = { limit: limit, offset: offset, tag: tag };
    }

    $.ajax({
      url: "api/posts/most_popular",
      data: data,
      success: function(posts) {
        callback(posts);
      }
    });
  },

  fetchMostRecentPosts: function(callback, limit, offset, tag) {
    let data;
    if (tag === "Most Viral") {
      data = { limit: limit, offset: offset };
    } else {
      data = { limit: limit, offset: offset, tag: tag };
    }

    $.ajax({
      url: "api/posts/most_recent",
      data: data,
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

  createComment: function(comment, callback) {
    $.ajax({
      url: "api/comments",
      method: "POST",
      data: { comment: comment },
      success: function(resp) {
        callback(resp);
      }
    });
  }
};

module.exports = PostApiUtil;
