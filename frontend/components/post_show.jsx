const React = require('react');
const PostIndexStore = require('../stores/post_index_store');
const PostDetailStore = require('../stores/post_detail_store');
const PostActions = require('../actions/post_actions');
const PostIndex = require('./post_index');
const PostDetail = require('./post_detail');
const hashHistory = require('react-router').hashHistory;

const PostShow = React.createClass({
  getInitialState() {
    const postId = this.props.params.postId;
    return { post: PostIndexStore.find(postId), activePostIndex: PostIndexStore.indexOf(postId) };
  },

  handleArrows(event) {
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
  },

  componentDidMount() {
    PostActions.fetchSinglePost(this.props.params.postId);
    this.PostIndexListener = PostIndexStore.addListener(this._onPostsChange);
    this.PostDetailListener = PostDetailStore.addListener(this._onPostChange);
    window.addEventListener("keydown", this.handleArrows);
  },

  _onPostChange() {
    this.setState( { post: PostDetailStore.find(this.props.params.postId), activePostIndex: PostIndexStore.indexOf(this.props.params.postId) } );
  },

  componentWillReceiveProps(newProps) {
    let props = newProps || this.props;
    PostActions.fetchSinglePost(props.params.postId);
  },

  componentWillUnmount() {
    this.PostIndexListener.remove();
    this.PostDetailListener.remove();
    window.removeEventListener("keydown", this.handleArrows);
  },

  prevPost() {
    if (this.state.activePostIndex > 0) {
      const posts = PostIndexStore.all();
      const index = this.state.activePostIndex - 1;
      this.setState( { activePostIndex: index } );
      hashHistory.push("posts/" + PostIndexStore.find(Object.keys(posts)[index]).id);
    }
  },

  nextPost() {
    const posts = PostIndexStore.all();
    const index = this.state.activePostIndex + 1;
    this.setState( { activePostIndex: index } );
    hashHistory.push("posts/" + PostIndexStore.find(Object.keys(posts)[index]).id);
  },

  render() {
    return(
      <div className="single-post-show">
        <div className="post-show-left">
          <PostDetail post={ this.state.post } prevPost={ this.prevPost } nextPost={ this.nextPost } />
        </div>
        <PostIndex className="post-show-post-index-container" activePostIndex={ this.state.activePostIndex }/>
      </div>
    )
  }
});

module.exports = PostShow;
