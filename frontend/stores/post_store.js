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

PostStore.add = function(post) {

};

function resetAllPosts(posts){
  _posts = posts;
  PostStore.__emitChange();
}

// keep the post thumb for display in index
function resetSinglePost(post){
  let thumb = _posts[post.id].thumb;
  _posts[post.id] = post;
  _posts[post.id]['thumb'] = thumb;
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
