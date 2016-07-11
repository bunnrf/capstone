const React = require('react');
const TimeUtil = require('../util/time_util');
const VoteActions = require('../actions/vote_actions');

const CommentDetail = React.createClass({
  getInitialState() {
    return { voteStatus: this.props.voteStatus };
  },

  toggleUpvote() {
    if (this.state.voteStatus === "downvote") {
      VoteActions.updateVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else if (this.state.voteStatus === "upvote") {
      VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else {
      VoteActions.createVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    }
  },

  toggleDownvote() {
    if (this.state.voteStatus === "upvote") {
      VoteActions.updateVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else if (this.state.voteStatus === "downvote") {
      VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else {
      VoteActions.createVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    }
  },

  render(){
    let comment = this.props.comment;
    let upvoteClass = "upvote";
    let downvoteClass = "downvote";

    if (this.state.voteStatus === "upvote") {
      upvoteClass = "upvote upvoted";
    } else if (this.state.voteStatus === "downvote") {
      downvoteClass = "downvote downvoted";
    }

    return(
      <div className="comment-container">
        <div className="votes-container">
          <div className="upvote-button" onClick={ this.toggleUpvote }><span className={upvoteClass}>➜</span></div>
          <div className="downvote-button" onClick={ this.toggleDownvote }><span className={downvoteClass}>➜</span></div>
        </div>
        <div className="comment-text-container">
          <div className="details">
            <a href={"users/" + comment.commenter.id}>{comment.commenter.username}</a>
            <span> {comment.points} points : { TimeUtil.timeSince(comment.time_since) } </span>
          </div>
          <div className="body">
            { comment.body }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = CommentDetail;
