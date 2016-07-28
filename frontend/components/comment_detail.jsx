const React = require('react');
const TimeUtil = require('../util/time_util');
const VoteActions = require('../actions/vote_actions');

const CommentDetail = React.createClass({
  getInitialState() {
    return { voteStatus: this.props.voteStatus };
  },

  componentWillReceiveProps(newProps) {
    this.setState( { voteStatus: this.props.voteStatus } );
  },

  isUpvoted() {
    if (this.state.voteStatus) {
      return this.state.voteStatus === "upvote";
    }
    return false;
  },

  isDownvoted() {
    if (this.state.voteStatus) {
      return this.state.voteStatus === "downvote";
    }
    return false;
  },

  toggleUpvote() {
    if (this.isDownvoted()) {
      VoteActions.updateVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else if (this.isUpvoted()) {
      VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else {
      VoteActions.createVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    }
  },

  toggleDownvote() {
    if (this.isUpvoted()) {
      VoteActions.updateVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else if (this.isDownvoted()) {
      VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
    } else {
      VoteActions.createVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
    }
  },

  render(){
    let comment = this.props.comment;
    let upvoteClass = "upvote";
    let downvoteClass = "downvote";
    let pointsText = comment.points + (comment.points === 1 ? " point" : " points");

    let commentsByParent = this.props.commentsByParent;
    let repliesText;
    if (commentsByParent[comment.id]) {
      repliesText = " : " + Object.keys(commentsByParent[comment.id]).length + (Object.keys(commentsByParent[comment.id]).length === 1 ? " reply " : " replies ");
    }

    if (this.state.voteStatus === "upvote") {
      upvoteClass = "upvote upvoted";
    } else if (this.state.voteStatus === "downvote") {
      downvoteClass = "downvote downvoted";
    }

    return(
      <div className="comment-container">
        <div className="votes-container">
          <div className="upvote-button" onClick={ this.toggleUpvote }><span className={ upvoteClass }>➜</span></div>
          <div className="downvote-button" onClick={ this.toggleDownvote }><span className={ downvoteClass }>➜</span></div>
        </div>
        <div className="comment-text-container">
          <div className="details">
            <a href={ "users/" + comment.commenter.id }>{ comment.commenter.username }</a>
            <span> { pointsText } : { TimeUtil.timeSince(comment.time_since) }{ repliesText } <a onClick={this.reply}>reply</a></span>
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
