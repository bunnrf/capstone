const React = require('react');
const ImageDetail = require('./image_detail');
const CommentDetail = require('./comment_detail');
const PostActions = require('../actions/post_actions');
const PostStore = require('../stores/post_store');

const PostDetail = React.createClass({
  getInitialState(){
    return { post: PostStore.find(this.props.post.id) };
  },

  componentDidMount(){
    this.PostListener = PostStore.addListener(this._onChange);
  },

  _onChange(){
    this.setState({ post: PostStore.find(this.props.post.id) });
  },

  componentWillReceiveProps(){
    PostActions.fetchSinglePost(this.props.post.id);
  },

  componentWillUnmount(){
    this.PostListener.remove();
  },

  render(){
    let post = this.state.post || {};
    let imagesIndex = [];
    let commentsIndex = [];

    // debugger

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

    return(
      <div className="post-detail">
        <div className="post-container">
          <div className="post-header">
            <h2>{post.title}</h2>
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
          <h2>Comments</h2>
          {commentsIndex}
        </div>
      </div>
    )
  }
})

module.exports = PostDetail;
