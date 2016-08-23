const Store = require('flux/utils').Store;
const PostConstants = require('../constants/post_constants');
const VoteConstants = require('../constants/vote_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _posts = {};

const PostDetailStore = new Store(dispatcher);

PostDetailStore.find = function(postId) {
  return Object.assign({}, _posts[postId]);
};

function resetSinglePost(post) {
  _posts[post.id] = post;
  PostDetailStore.__emitChange();
};

function addNewComment(comment) {
  _posts[comment.post_id][PostConstants.NEW_COMMENT] = comment;
  PostDetailStore.__emitChange();
};

PostDetailStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case PostConstants.POST_RECEIVED:
      resetSinglePost(payload.post);
      break;
    case VoteConstants.VOTE_RECEIVED:
      resetSinglePost(payload.post);
      break;
    case VoteConstants.VOTE_REMOVED:
      resetSinglePost(payload.post);
      break;
    case PostConstants.COMMENT_RECEIVED:
      addNewComment(payload.comment);
      break;
  }
}

module.exports = PostDetailStore;
