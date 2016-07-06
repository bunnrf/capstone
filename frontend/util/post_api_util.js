const PostApiUtil = {
  fetchAllPosts: function(callback) {
    $.ajax({
      url: "api/posts",
      success: function(resp) {
        callback(resp)
      }
    })
  },

  fetchSinglePost: function(id, callback) {
    $.ajax({
      url: "api/posts/" + id,
      success: function(resp) {
        callback(resp)
      }
    })
  },

  createPost: function(post, callback) {
    $.ajax({
      url: "api/posts",
      method: "POST",
      data: { post: post },
      success: function(resp) {
        callback(resp)
      }
    })
  },

  createComment: function(comment, callback) {
    $.ajax({
      url: "api/comments",
      method: "POST",
      data: { comment: comment },
      success: function(resp) {
        callback(resp)
      }
    })
  }
};

module.exports = PostApiUtil;
