const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _posts = {};

const PostStore = new Store(dispatcher);

PostStore.all = function(){
  return Object.assign({}, _posts);
};

PostStore.find = function(postId) {
  return Object.assign({}, _posts[postId]);
};

function resetAllPosts(posts){
  _posts = posts;
  PostStore.__emitChange();
}

function resetSinglePost(post){
  _posts[post.id] = post;
  PostStore.__emitChange();
}

PostStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      resetAllPosts(payload.posts);
      break;
    case PostConstants.POST_RECEIVED:
      resetSinglePost(payload.post);
      break;
  }
}

module.exports = PostStore;
