const PostConstants = require('../constants/post_constants');
const PostApiUtil = require('../util/post_api_util');
const dispatcher = require('../dispatcher/dispatcher');

const PostActions = {
  fetchAllPosts: function(){
    PostApiUtil.fetchAllPosts(this.receiveAllPosts)
  },

  fetchSinglePost: function(id){
    PostApiUtil.fetchSinglePost(id, this.receiveSinglePost)
  },

  receiveAllPosts: function(posts){
    dispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    })
  },

  createPost(post){
    PostApiUtil.createPost(post, this.receiveSinglePost);
  },

  receiveSinglePost: function(post){
    dispatcher.dispatch({
      actionType: PostConstants.POST_RECEIVED,
      post: post
    })
  }
}

module.exports = PostActions;
