const React = require('react');
const SessionStore = require('../stores/session_store');
const TimeUtil = require('../util/time_util');
const VoteActions = require('../actions/vote_actions');

const CommentDetail = React.createClass({
  getInitialState() {
    return { voteStatus: this.props.voteStatus, displayChildren: false };
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
    if (SessionStore.isUserLoggedIn()) {
      if (this.isDownvoted()) {
        VoteActions.updateVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
      } else if (this.isUpvoted()) {
        VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
      } else {
        VoteActions.createVote( {  vote_type: "upvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
      }
    } else {
      $(".signin-link")[0].click();
    }
  },

  toggleDownvote() {
    if (SessionStore.isUserLoggedIn()) {
      if (this.isUpvoted()) {
        VoteActions.updateVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
      } else if (this.isDownvoted()) {
        VoteActions.destroyVote( { votable_id: this.props.comment.id, votable_type: "Comment" } );
      } else {
        VoteActions.createVote( {  vote_type: "downvote", votable_id: this.props.comment.id, votable_type: "Comment" } );
      }
    } else {
      $(".signin-link")[0].click();
    }
  },

  toggleChildren() {
    this.setState( { displayChildren: !this.state.displayChildren } )
  },

  render(){
    let comment = this.props.comment;
    let comment_votes = this.props.commentVotes;
    let upvoteClass = "upvote";
    let downvoteClass = "downvote";
    let pointsText = comment.points + (comment.points === 1 ? " point" : " points");

    let children;
    let commentsByParent = this.props.commentsByParent;
    let repliesText;

    if (commentsByParent[comment.id]) {
      repliesText = " : " + Object.keys(commentsByParent[comment.id]).length + (Object.keys(commentsByParent[comment.id]).length === 1 ? " reply " : " replies ");
      if (this.state.displayChildren) {
        children = commentsByParent[comment.id].map((childComment) => {
          let voteStatus = undefined;
          if (comment_votes && comment_votes[childComment.id]) {
            voteStatus = comment_votes[childComment.id]["vote_type"]
          }
          return <CommentDetail key={ childComment.id } comment={ childComment } voteStatus={ voteStatus } commentsByParent={ commentsByParent } commentVotes={ comment_votes } />
        });
      }
    }

    if (this.state.voteStatus === "upvote") {
      upvoteClass = "upvote upvoted";
    } else if (this.state.voteStatus === "downvote") {
      downvoteClass = "downvote downvoted";
    }

    return(
      <div className="comment-container">
        <div className="comment-detail-container">
          <div className="votes-container">
            <div className="upvote-button" onClick={ this.toggleUpvote }><span className={ upvoteClass }>➜</span></div>
            <div className="downvote-button" onClick={ this.toggleDownvote }><span className={ downvoteClass }>➜</span></div>
          </div>
          <div className="comment-text-container" onClick={ this.toggleChildren }>
            <div className="details">
              <a href={ "users/" + comment.commenter.id }>{ comment.commenter.username }</a>
              <span> { pointsText } : { TimeUtil.timeSince(comment.time_since) }{ repliesText } <a onClick={this.reply}>reply</a></span>
            </div>
            <div className="body">
              { comment.body }
            </div>
          </div>
        </div>
        <div className="comment-children">
          { children }
        </div>
      </div>
    )
  }
});

module.exports = CommentDetail;
