const CommentCreate = require('./comment_create');
const SessionStore = require('../stores/session_store');
const TimeUtil = require('../util/time_util');
const VoteActions = require('../actions/vote_actions');
const CommentIndex = require('./comment_index');

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

  commentAdded() {
    this.setState( { displayReply: false, displayChildren: true } );
  },

  toggleChildren(e) {
    if (e.target.id !== "reply") {
      this.setState( { displayChildren: !this.state.displayChildren } );
    }
  },

  render() {
    let comment = this.props.comment;
    let commentVotes = this.props.commentVotes;
    let upvoteClass = "upvote glyphicon glyphicon-arrow-up";
    let downvoteClass = "downvote glyphicon glyphicon-arrow-down";
    let pointsText;
    let voteStatus;

    let children;
    let commentsByParent = this.props.commentsByParent;
    let commentCreate;
    let repliesText;
    let expandOption;

    if (commentsByParent[comment.id]) {
      repliesText = " : " + Object.keys(commentsByParent[comment.id]).length + (Object.keys(commentsByParent[comment.id]).length === 1 ? " reply " : " replies ");
      if (this.state.displayChildren) {
        expandOption = <span className="comment-expand-option" onClick={ this.toggleChildren }>-</span>;
        children = commentsByParent[comment.id].sort((a, b) => {
          return b.points - a.points;
        }).map((childComment) => {
          voteStatus = undefined;
          if (commentVotes && commentVotes[childComment.id]) {
            voteStatus = commentVotes[childComment.id]["vote_type"];
          }
          return <CommentDetail key={ childComment.id } comment={ childComment } postId={ this.props.postId } voteStatus={ voteStatus } commentsByParent={ commentsByParent } commentVotes={ commentVotes } />
        });
      } else {
        expandOption = <span className="comment-expand-option" onClick={ this.toggleChildren }>+</span>;
      }
    }

    if (this.state.displayReply) {
      commentCreate = <div className="comment-comment-create">
          <CommentCreate postId={ this.props.postId } parentCommentId={ comment.id } commentAdded={ this.commentAdded }/>
      </div>
    }

    if (this.state.voteStatus === "upvote") {
      upvoteClass = "upvote upvoted glyphicon glyphicon-arrow-up";
    } else if (this.state.voteStatus === "downvote") {
      downvoteClass = "downvote downvoted glyphicon glyphicon-arrow-down";
    }

    // so new comments appear on top
    if (comment.points === 999999) {
      pointsText = "0 points";
    } else {
      pointsText = comment.points + (comment.points === 1 ? " point" : " points");
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
              <a href={ "#/users/" + comment.commenter.id }>{ comment.commenter.username }</a>
              <span> { pointsText } : { comment.time_since ? TimeUtil.timeSince(comment.time_since) : "just now"}{ repliesText } <a id="reply" onClick={ this.toggleReply }>reply</a></span>
            </div>
            <div className="body">
              { comment.body }
            </div>
          </div>
        </div>
        <div className="comment-children">
          { commentCreate }
          { children }
        </div>
      </div>
    )
  }
});

module.exports = CommentDetail;
