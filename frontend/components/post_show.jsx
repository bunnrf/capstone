const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndex = require('./post_index');
const PostDetail = require('./post_detail');
const hashHistory = require('react-router').hashHistory;

const PostShow = React.createClass({
  getInitialState() {
    const postId = this.props.params.postId;
    return { post: PostStore.find(postId), activePostIndex: PostStore.indexOf(postId) };
  },

  componentDidMount() {
    PostActions.fetchSinglePost(this.props.params.postId);
    this.PostListener = PostStore.addListener(this._onChange);
    this.keyListener = window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          event.preventDefault();
          this.prevPost();
          break;
        case 39:
          event.preventDefault();
          this.nextPost();
          break;
      }
    });
  },

  _onChange() {
    this.setState({ post: PostStore.find(this.props.params.postId) });
  },

  componentWillReceiveProps(newProps) {
    let props = newProps || this.props;
    PostActions.fetchSinglePost(props.params.postId);
  },

  componentWillUnmount() {
    this.PostListener.remove();
    this.keyListener.remove();
  },

  prevPost() {
    if (this.state.activePostIndex > 0) {
      const posts = PostStore.all();
      const index = this.state.activePostIndex;
      this.setState( { activePostIndex: index - 1 } );
      hashHistory.push("posts/" + PostStore.find(Object.keys(posts)[index - 1]).id);
    }
  },

  nextPost() {
    const posts = PostStore.all();
    const index = this.state.activePostIndex;
    this.setState( { activePostIndex: index + 1 } );
    hashHistory.push("posts/" + PostStore.find(Object.keys(posts)[index + 1]).id);
  },

  render() {
    return(
      <div className="single-post-show">
        <div className="post-show-left">
          <PostDetail post={ this.state.post } prevPost={ this.prevPost } nextPost={ this.nextPost } />
        </div>
        <PostIndex className="post-show-post-index-container" postIndex={ this.state.activePostIndex }/>
      </div>
    )
  }
});

module.exports = PostShow;
