const React = require('react');
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
      voteStatus = currentUser.post_votes[this.props.post.id]["vote_status"];
    }

    return { currentUser: currentUser, voteStatus: voteStatus };
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
    this.windowListener = window.addEventListener('scroll', this.stickyScroll, false);
  },

  _userChanged() {
    let currentUser = SessionStore.currentUser();
    let voteStatus;

    if (currentUser.post_votes && currentUser.post_votes[this.props.post.id]) {
      voteStatus = currentUser.post_votes[this.props.post.id]["vote_status"];
    }

    this.setState( { currentUser: currentUser, voteStatus: voteStatus } );
  },

  componentWillUnmount() {
    this.userListener.remove();
    window.removeEventListener('scroll', this.stickyScroll, false);
  },

  isUpvoted() {
    this.state.currentUser
  },

  isDownvoted() {
    this.state.userVotes
  },

  toggleUpvote() {
    if (this.isDownvoted()) {
      VoteActions.updateVote( {  vote_type: "downvote", votable_id: this.props.post.id, votable_type: "Post" } );
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
    let commentsIndex = [];
    let style = { paddingTop: 0 };
    let authorData;
    let post_votes;
    let comment_votes;
    let headerClass = "post-header";
    let upvoteClass = "upvote";
    let downvoteClass = "downvote";

    console.log(this.state.currentUser);

    if (this.state.currentUser) {
      post_votes = this.state.currentUser.post_votes;
      comment_votes = this.state.currentUser.comment_votes;

      if (this.isUpvoted()) {
        upvoteClass = "upvote upvoted";
      } else if (this.isDownvoted()) {
        downvoteClass = "downvote downvoted";
      }
    }

    if(post.images){
      imagesIndex = post.images.map((image) => {
        return <ImageDetail key={ image.id } image={ image } />
      });
    }
    if (post.comments){
      commentsIndex = post.comments.map((comment) => {
        let voteStatus = undefined;
        if (comment_votes && comment_votes[comment.id]) {
          voteStatus = comment_votes[comment.id]["vote_type"]
        }
        return <CommentDetail key={ comment.id } comment={ comment } voteStatus={ voteStatus }/>
      });
    }
    if (post.author) {
      authorData = <div className="post-header-details">
        <span>by </span><a href={"users/" + post.author.id}>{post.author.username}</a><span> · {TimeUtil.timeSince(post.time_since)} </span>
      </div>
    } else {
      <div className="post-header-details">
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
              {authorData}
            </div>
            <div className="post-nav">
              <div className="post-show-prev" onClick={ this.props.prevPost }><span className="glyphicon glyphicon-menu-left"></span></div>
              <div className="post-show-next" onClick={ this.props.nextPost }>Next Post<span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></div>
            </div>
          </div>
          {imagesIndex}
          <div className="post-footer">
            <div className="upvote-button" onClick={ this.toggleUpvote }><span className={upvoteClass}>➜</span></div>
            <div className="downvote-button" onClick={ this.toggleDownvote }><span className={downvoteClass}>➜</span></div>
            <div className="post-stats"><span className="points">{ post.points } points</span></div>
          </div>
        </div>
        <div className="post-comments-container">
          <CommentCreate postId={post.id}/>
          {commentsIndex}
        </div>
      </div>
    )
  }
})

module.exports = PostDetail;
