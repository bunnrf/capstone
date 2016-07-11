const dispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const VoteConstants = require('../constants/vote_constants');

const SessionStore = new Store(dispatcher);

let _currentUser = {};
let _currentUserHasBeenFetched = false;

const _login = function(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

const _logout = function() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
};

SessionStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      SessionStore.__emitChange();
      break;
    case VoteConstants.VOTE_RECEIVED:
      SessionStore.__emitChange();
      break;
    case VoteConstants.VOTE_REMOVED:
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return !!_currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function() {
  return !!_currentUser.id;
};

SessionStore._addVote = function(vote) {
  if (vote.votable_type === "Post") {
    _currentUser.post_votes[vote.votable_id] = { vote_type: vote.vote_type};
  } else {
    _currentUser.comment_votes[vote.votable_id] = { vote_type: vote.vote_type};
  }
};

SessionStore._removeVote = function(vote) {
  if (vote.votable_type === "Post") {
    _currentUser.post_votes[vote.votable_id] = "";
  } else {
    _currentUser.comment_votes[vote.votable_id] = "";
  }
};


module.exports = SessionStore;
