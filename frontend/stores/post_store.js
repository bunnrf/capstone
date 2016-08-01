const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');
const VoteConstants = require('../constants/vote_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _posts = {};
let _hasMorePosts = true;

const PostStore = new Store(dispatcher);

PostStore.hasMorePosts = () => _hasMorePosts;

PostStore.all = function() {
  return Object.assign({}, _posts);
};

PostStore.find = function(postId) {
  return Object.assign({}, _posts[postId]);
};

PostStore.indexOf = function(postId) {
  return Object.keys(_posts).indexOf(postId);
};

PostStore.add = function(post) {

};

function appendPosts(posts) {
  _hasMorePosts = !!Object.keys(posts).length;

  _posts = Object.assign(_posts, posts);
  PostStore.__emitChange();
};

function resetAllPosts(posts) {
  _hasMorePosts = !!Object.keys(posts).length;
  _posts = posts;
  PostStore.__emitChange();
};

// keep the post thumb for display in index
function resetSinglePost(post) {
  let thumb = _posts[post.id].thumb;
  _posts[post.id] = post;
  _posts[post.id]['thumb'] = thumb;
  PostStore.__emitChange();
}

PostStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      resetAllPosts(payload.posts);
      break;
    case PostConstants.POST_RECEIVED:
      resetSinglePost(payload.post);
      break;
    case PostConstants.APPEND_POSTS:
      appendPosts(payload.posts);
      break;
    case VoteConstants.VOTE_RECEIVED:
      resetSinglePost(payload.post);
      break;
    case VoteConstants.VOTE_REMOVED:
      resetSinglePost(payload.post);
      break;
  }
}

module.exports = PostStore;
