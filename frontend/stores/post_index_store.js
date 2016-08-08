const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');
const VoteConstants = require('../constants/vote_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _posts = {};
let _hasMorePosts = true;

const PostIndexStore = new Store(dispatcher);

PostIndexStore.hasMorePosts = () => _hasMorePosts;

PostIndexStore.all = function() {
  return Object.assign({}, _posts);
};

PostIndexStore.find = function(postId) {
  return Object.assign({}, _posts[postId]);
};

PostIndexStore.indexOf = function(postId) {
  return Object.keys(_posts).indexOf(postId);
};

PostIndexStore.add = function(post) {

};

function appendPosts(posts) {
  _hasMorePosts = !!Object.keys(posts).length;

  _posts = Object.assign(_posts, posts);
  PostIndexStore.__emitChange();
};

function resetAllPosts(posts) {
  _hasMorePosts = !!Object.keys(posts).length;
  _posts = posts;
  PostIndexStore.__emitChange();
};

// keep the post thumb for display in index
// function resetSinglePost(post) {
//   // Object.assign(_posts[post.id], post);
//   let thumb = _posts[post.id].thumb;
//   _posts[post.id] = post;
//   _posts[post.id]['thumb'] = thumb;
//   PostIndexStore.__emitChange();
// };

PostIndexStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      resetAllPosts(payload.posts);
      break;
    case PostConstants.APPEND_POSTS:
      appendPosts(payload.posts);
      break;
  }
}

module.exports = PostIndexStore;
