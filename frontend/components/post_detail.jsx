const React = require('react');
const ImageDetail = require('./image_detail');
const CommentDetail = require('./comment_detail');
const CommentCreate = require('./comment_create');
const PostActions = require('../actions/post_actions');
const PostStore = require('../stores/post_store');
const TimeUtil = require('../util/time_util');

const PostDetail = React.createClass({
  getInitialState() {
    return { headerClass: "post-header" };
  },

  stickyScroll(e) {
    if( window.pageYOffset >= 144) {
      this.setState( { headerClass: "post-header-fixed" } );
    }
    if( window.pageYOffset < 144) {
      this.setState( { headerClass: "post-header" } );
    }
  },

  componentDidMount() {
    this.windowListener = window.addEventListener('scroll', this.stickyScroll, false);
  },

  componentWillUnmount() {
    this.windowListener.remove();
  },

  render(){
    let post = this.props.post;
    let imagesIndex = [];
    let commentsIndex = [];
    let style = { paddingTop: 0 };
    let authorData;

    if(post.images){
      imagesIndex = post.images.map((image) => {
        return <ImageDetail key={ image.id } image={ image } />
      })
    }
    if (post.comments){
      commentsIndex = post.comments.map((comment) => {
        return <CommentDetail key={ comment.id } comment={ comment } />
      })
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

    if (this.state.headerClass === "post-header-fixed") {
      let headerHeight = $(".post-header-fixed").eq(0).height() || $(".post-header").eq(0).height();
      style = { paddingTop: headerHeight + 20 + 'px' };
    }

    return(
      <div className="post-detail">
        <div className="post-container" style={ style }>
          <div className={this.state.headerClass}>
            <div className="post-header-content-container">
              <div className="post-header-title">
                <h1>{post.title}</h1>
              </div>
              {authorData}
            </div>
            <div className="post-nav">
              <div className="post-show-prev" onClick={this.nextPost}>{ "<" }</div>
              <div className="post-show-next" onClick={this.nextPost}>{ "Next Post >" }</div>
            </div>
          </div>
          {imagesIndex}
          <div className="post-description">
            {post.description}
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
