const VoteApiUtil = {
  createVote: function(vote, callback) {
    $.ajax({
      url: "api/votes",
      method: "POST",
      data: { vote: vote },
      success: function(resp) {
        callback(resp)
      }
    })
  },

  updateVote: function(vote, callback) {
    $.ajax({
      url: "api/votes",
      method: "PATCH",
      data: { vote: vote },
      success: function(resp) {
        callback(resp)
      }
    })
  },

  destroyVote: function(vote, callback) {
    $.ajax({
      url: "api/votes",
      method: "DELETE",
      data: { vote: vote },
      success: function(resp) {
        callback(resp)
      }
    })
  }
}

module.exports = VoteApiUtil;
