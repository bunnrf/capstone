const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const ImageDetail = require('./image_detail');
const CommentDetail = require('./comment_detail');

const PostShow = React.createClass({
  getInitialState() {
    const postId = this.props.params.postId;
    const post = PostStore.find(postId) || {} ;
    return { post: post };
  },

  componentDidMount() {
    this.postListener = PostStore.addListener(this._postChanged);
    PostActions.fetchSinglePost(this.props.params.postId);
  },

  componentWillUnmount() {
    this.postListener.remove();
  },

  _postChanged() {
    const postId = this.props.params.postId;
    const post = PostStore.find(postId);
    this.setState({ post: post });
  },

  render(){
    let post = this.state.post;
    let images = [];
    let comments = [];

    if(post.images){
      images = post.images.map((image) => {
        return <ImageDetail key={ image.id } image={ image } />
      })
    }
    if (post.comments) {
      comments = post.comments.map((comment) => {
        return <CommentDetail key={ comment.id } comment={ comment } />
      })
    }
    return(
      <div className="single-post-show">
        <div className="post-show-left">
          <div className="post-container">
            <div className="post-header">
              <h2>{post.title}</h2>
            </div>
            {images}
            <div className="post-description">
              {post.description}
            </div>
          </div>
          <div className="post-comments-container">
            <h2>Comments</h2>
            {comments}
          </div>
        </div>
        <div className="post-show-right">

        </div>
      </div>
    )
  }
});

module.exports = PostShow;
