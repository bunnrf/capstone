const React = require('react');
const CommentCreate = require('./comment_create');
const SessionStore = require('../stores/session_store');
const TimeUtil = require('../util/time_util');
const VoteActions = require('../actions/vote_actions');

const CommentDetail = React.createClass({
  getInitialState() {
    return { voteStatus: this.props.voteStatus, displayChildren: false, displayReply: false };
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

  toggleReply() {
    this.setState( { displayReply: !this.state.displayReply, displayChildren: this.state.displayChildren && !this.state.displayReply } );
  },

  toggleChildren(e) {
    if (e.target.id !== "reply") {
      this.setState( { displayChildren: !this.state.displayChildren } );
    }
  },

  render(){
    let comment = this.props.comment;
    let comment_votes = this.props.commentVotes;
    let upvoteClass = "upvote glyphicon glyphicon-arrow-up";
    let downvoteClass = "downvote glyphicon glyphicon-arrow-down";
    let pointsText = comment.points + (comment.points === 1 ? " point" : " points");

    let children;
    let commentsByParent = this.props.commentsByParent;
    let commentCreate;
    let repliesText;
    let expandOption;

    if (commentsByParent[comment.id]) {
      repliesText = " : " + Object.keys(commentsByParent[comment.id]).length + (Object.keys(commentsByParent[comment.id]).length === 1 ? " reply " : " replies ");
      if (this.state.displayChildren) {
        expandOption = <span className="comment-expand-option">-</span>;
        children = commentsByParent[comment.id].sort((a, b) => {
          return b.points - a.points;
        }).map((childComment) => {
          let voteStatus = undefined;
          if (comment_votes && comment_votes[childComment.id]) {
            voteStatus = comment_votes[childComment.id]["vote_type"]
          }
          return <CommentDetail key={ childComment.id } comment={ childComment } voteStatus={ voteStatus } commentsByParent={ commentsByParent } commentVotes={ comment_votes } />
        });
      } else {
        expandOption = <span className="comment-expand-option">+</span>;
      }
    }

    if (this.state.displayReply) {
      commentCreate = <div className="comment-comment-create">
          <CommentCreate postId={ this.props.postId } parentCommentId={ comment.id } />
      </div>
    }

    if (this.state.voteStatus === "upvote") {
      upvoteClass = "upvote upvoted glyphicon glyphicon-arrow-up";
    } else if (this.state.voteStatus === "downvote") {
      downvoteClass = "downvote downvoted glyphicon glyphicon-arrow-down";
    }

    return(
      <div className="comment-container">
        <div className="comment-detail-container">
          { expandOption }
          <div className="votes-container">
            <div className="upvote-button" onClick={ this.toggleUpvote }><span className={ upvoteClass } /></div>
            <div className="downvote-button" onClick={ this.toggleDownvote }><span className={ downvoteClass } /></div>
          </div>
          <div className="comment-text-container" onClick={ this.toggleChildren }>
            <div className="details">
              <a href={ "users/" + comment.commenter.id }>{ comment.commenter.username }</a>
              <span> { pointsText } : { TimeUtil.timeSince(comment.time_since) }{ repliesText } <a id="reply" onClick={ this.toggleReply }>reply</a></span>
            </div>
            <div className="body">
              { comment.body }
            </div>
          </div>
        </div>
        { commentCreate }
        <div className="comment-children">
          { children }
        </div>
      </div>
    )
  }
});

module.exports = CommentDetail;
