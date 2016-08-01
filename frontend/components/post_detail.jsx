const React = require('react');
const Linkify = require('react-linkify');
const ImageDetail = require('./image_detail');
const CommentDetail = require('./comment_detail');
const CommentCreate = require('./comment_create');
const PostActions = require('../actions/post_actions');
const VoteActions = require('../actions/vote_actions');
const PostStore = require('../stores/post_store');
const SessionStore = require('../stores/session_store')
const TimeUtil = require('../util/time_util');

const PostDetail = React.createClass({
  getInitialState() {
    let currentUser = SessionStore.currentUser();
    let voteStatus;

    if (currentUser.post_votes && currentUser.post_votes[this.props.post.id]) {
      voteStatus = currentUser.post_votes[this.props.post.id]["vote_type"];
    }

    return { currentUser: currentUser, voteStatus: voteStatus, headerFixed: false };
  },

  stickyScroll(e) {
    if( window.pageYOffset > 69 && this.state.headerFixed === false) {
      this.setState( { headerFixed: true } );
    }
    if( window.pageYOffset < 69 && this.state.headerFixed === true) {
      this.setState( { headerFixed: false } );
    }
  },

  componentDidMount() {
    this.userListener = SessionStore.addListener(this._userChanged);
    window.addEventListener('scroll', this.stickyScroll, false);
  },

  _userChanged() {
    let currentUser = SessionStore.currentUser();
    let voteStatus;

    if (currentUser.post_votes && currentUser.post_votes[this.props.post.id]) {
      voteStatus = currentUser.post_votes[this.props.post.id]["vote_type"];
    }

    this.setState( { currentUser: currentUser, voteStatus: voteStatus } );
  },

  componentWillReceiveProps(newProps) {
    let currentUser = this.state.currentUser;
    let voteStatus;

    if (currentUser.post_votes && currentUser.post_votes[newProps.post.id]) {
      voteStatus = currentUser.post_votes[newProps.post.id]["vote_type"];
    }

    this.setState( { voteStatus: voteStatus } );
  },

  componentWillUnmount() {
    this.userListener.remove();
    window.removeEventListener('scroll', this.stickyScroll, false);
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
      VoteActions.updateVote( {  vote_type: "upvote", votable_id: this.props.post.id, votable_type: "Post" } );
    } else if (this.isUpvoted()) {
      VoteActions.destroyVote( { votable_id: this.props.post.id, votable_type: "Post" } );
    } else {
      VoteActions.createVote( {  vote_type: "upvote", votable_id: this.props.post.id, votable_type: "Post" } );
    }
  },

  toggleDownvote() {
    if (this.isUpvoted()) {
      VoteActions.updateVote( {  vote_type: "downvote", votable_id: this.props.post.id, votable_type: "Post" } );
    } else if (this.isDownvoted()) {
      VoteActions.destroyVote( { votable_id: this.props.post.id, votable_type: "Post" } );
    } else {
      VoteActions.createVote( {  vote_type: "downvote", votable_id: this.props.post.id, votable_type: "Post" } );
    }
  },

  render(){
    let post = this.props.post;
    let imagesIndex = [];
    let description;
    let commentsIndex = [];
    let style = { paddingTop: 0 };
    let authorData;
    let post_votes;
    let comment_votes;
    let headerClass = "post-header";
    let upvoteClass = "upvote glyphicon glyphicon-arrow-up";
    let downvoteClass = "downvote glyphicon glyphicon-arrow-down";

    if (this.state.currentUser) {
      post_votes = this.state.currentUser.post_votes;
      comment_votes = this.state.currentUser.comment_votes;

      if (this.isUpvoted()) {
        upvoteClass = "upvote upvoted glyphicon glyphicon-arrow-up";
      } else if (this.isDownvoted()) {
        downvoteClass = "downvote downvoted glyphicon glyphicon-arrow-down";
      }
    }

    if(post.images){
      imagesIndex = post.images.sort((a, b) => {
        return a.ordinal - b.ordinal;
      }).map((image) => {
        return <ImageDetail key={ image.id } image={ image } />
      });
    }
    if (post.description) {
      description = <div className="image-detail-description">
        <Linkify>{ post.description }</Linkify>
      </div>
    }
    if (post.comments_by_parent){
      commentsIndex = post.comments_by_parent[""].sort((a, b) => {
        return b.points - a.points;
      }).map((topLevelComment) => {
        let voteStatus = undefined;
        if (comment_votes && comment_votes[topLevelComment.id]) {
          voteStatus = comment_votes[topLevelComment.id]["vote_type"]
        }
        return <CommentDetail key={ topLevelComment.id } postId={ post.id } comment={ topLevelComment } voteStatus={ voteStatus } commentsByParent={ post.comments_by_parent } commentVotes={ comment_votes }/>
      });
    }
    if (post.author) {
      authorData = <div className="post-header-details">
        <span>by </span><a href={ "users/" + post.author.id }>{ post.author.username }</a><span> · { TimeUtil.timeSince(post.time_since) } </span>
      </div>
    } else {
      authorData = <div className="post-header-details">
        author unrecognized
      </div>
    }

    if (this.state.headerFixed === true) {
      let headerHeight = $(".post-header-fixed").eq(0).height() || $(".post-header").eq(0).height();
      style = { paddingTop: headerHeight + 20 + 'px' };
      headerClass = "post-header-fixed"
    }

    return(
      <div className="post-detail">
        <div className="post-container" style={ style }>
          <div className={ headerClass }>
            <div className="post-header-content-container">
              <div className="post-header-title">
                <h1>{ post.title }</h1>
              </div>
              { authorData }
            </div>
            <div className="post-nav">
              <div className="post-show-prev" onClick={ this.props.prevPost }><span className="glyphicon glyphicon-menu-left"></span></div>
              <div className="post-show-next" onClick={ this.props.nextPost }>Next Post<span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></div>
            </div>
          </div>
          { imagesIndex }
          { description }
          <div className="post-footer">
            <div className="upvote-button" onClick={ this.toggleUpvote }><span className={ upvoteClass } /></div>
            <div className="downvote-button" onClick={ this.toggleDownvote }><span className={ downvoteClass } /></div>
            <div className="post-stats"><span className="points">{ post.points } points</span></div>
          </div>
        </div>
        <div className="post-comments-container">
          <CommentCreate postId={ post.id }/>
          { commentsIndex }
        </div>
      </div>
    )
  }
});

module.exports = PostDetail;
