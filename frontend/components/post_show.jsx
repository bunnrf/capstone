const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndex = require('./post_index');
const PostDetail = require('./post_detail');

const PostShow = React.createClass({
  getInitialState(){
    return { post: PostStore.find(this.props.params.postId) };
  },

  componentDidMount(){
    this.PostListener = PostStore.addListener(this._onChange);
    PostActions.fetchSinglePost(this.props.params.postId);
  },

  _onChange(){
    this.setState({ post: PostStore.find(this.props.params.postId) });
  },

  componentWillReceiveProps(newProps){
    let props = newProps || this.props;
    PostActions.fetchSinglePost(props.params.postId);
  },

  componentWillUnmount(){
    this.PostListener.remove();
  },

  render(){
    return(
      <div className="single-post-show">
        <div className="post-show-left">
          <PostDetail post={ this.state.post } />
        </div>
        <div className="post-show-right">
          <div className="post-show-post-index-header">
            
          </div>
          <div className="post-show-right-scroll-container">
            <PostIndex className="post-show-post-index-container" />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PostShow;
