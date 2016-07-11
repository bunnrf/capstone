const VoteConstants = require('../constants/vote_constants');
const VoteApiUtil = require('../util/vote_api_util');
const dispatcher = require('../dispatcher/dispatcher');

const VoteActions = {
  createVote(vote) {
    VoteApiUtil.createVote(vote, this.receiveVote);
  },

  updateVote(vote) {
    VoteApiUtil.updateVote(vote, this.receiveVote);
  },

  destroyVote(vote) {
    VoteApiUtil.destroyVote(vote, this.removeVote);
  },

  receiveVote: function(vote) {
    dispatcher.dispatch({
      actionType: VoteConstants.VOTE_RECEIVED,
      vote: vote
    });
  },

  removeVote: function(vote) {
    dispatcher.dispatch({
      actionType: VoteConstants.VOTE_REMOVED,
      vote: vote
    });
  }
}

module.exports = VoteActions;
