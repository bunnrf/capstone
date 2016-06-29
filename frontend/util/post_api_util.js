const PostApiUtil = {
  fetchAllPosts: function(callback){
    $.ajax({
      url: "api/posts",
      success: function(resp){
        callback(resp)
      }
    })
  },

  createPost: function(callback){
    $.ajax({
      url: "api/posts",
      success: function(resp){
        callback(resp)
      }
    })
  }
};

module.exports = PostApiUtil;
