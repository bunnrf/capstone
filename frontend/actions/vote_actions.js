const VoteConstants = require('../constants/vote_constants');
const VoteApiUtil = require('../util/vote_api_util');
const SessionStore = require('../stores/session_store');
const dispatcher = require('../dispatcher/dispatcher');

const VoteActions = {
  createVote(vote) {
    SessionStore._addVote(vote);
    VoteApiUtil.createVote(vote, this.receiveVote);
  },

  updateVote(vote) {
    SessionStore._addVote(vote);
    VoteApiUtil.updateVote(vote, this.receiveVote);
  },

  destroyVote(vote) {
    SessionStore._removeVote(vote);
    VoteApiUtil.destroyVote(vote, this.removeVote);
  },

  receiveVote: function(post) {
    dispatcher.dispatch({
      actionType: VoteConstants.VOTE_RECEIVED,
      post: post
    });
  },

  removeVote: function(post) {
    dispatcher.dispatch({
      actionType: VoteConstants.VOTE_REMOVED,
      post: post
    });
  }
}

module.exports = VoteActions;
