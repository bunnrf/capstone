const React = require('react');
const ImageDetail = require('./image_detail');
const CommentDetail = require('./comment_detail');
const CommentCreate = require('./comment_create');
const PostActions = require('../actions/post_actions');
const PostStore = require('../stores/post_store');

const PostDetail = React.createClass({
  getInitialState() {
    return { header_class: "post-header" };
  },

  stickyScroll(e) {
    if( window.pageYOffset > 144 ) {
      this.setState( { header_class: "post-header-fixed" } );
    }
    if( window.pageYOffset < 144 ) {
      this.setState( { header_class: "post-header" } );
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
    let style = { "padding-top": 0 };

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

    if (this.state.header_class === "post-header-fixed") {
      style = { "padding-top": 60 + 'px' };
    }

    return(
      <div className="post-detail">
        <div className="post-container" style={ style }>
          <div className={this.state.header_class}>
            <div className="post-header-title">
              <h1>{post.title}</h1>
            </div>
            <div className="post-nav">
              <button className="post-show-next" onClick={this.nextPost}>Previous Post</button>
              <button className="post-show-next" onClick={this.nextPost}>Next Post</button>
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
