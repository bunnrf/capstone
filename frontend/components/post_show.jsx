const PostIndexStore = require('../stores/post_index_store');
const PostDetailStore = require('../stores/post_detail_store');
const PostActions = require('../actions/post_actions');
const PostIndex = require('./post_index');
const PostDetail = require('./post_detail');
const hashHistory = require('react-router').hashHistory;

const PostShow = React.createClass({
  getInitialState() {
    const postId = this.props.params.postId;
    return { post: PostIndexStore.find(postId) };
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
    this.PostDetailListener = PostDetailStore.addListener(this._onPostChange);
    window.addEventListener("keydown", this.handleArrows);
    PostIndexStore.updateActiveIndex(PostIndexStore.indexOf(this.props.params.postId));
  },

  _onPostChange() {
    this.setState( { post: PostDetailStore.find(this.props.params.postId) } );
  },

  componentWillReceiveProps(newProps) {
    let props = newProps || this.props;
    PostActions.fetchSinglePost(props.params.postId);
    PostIndexStore.updateActiveIndex(PostIndexStore.indexOf(props.params.postId));
  },

  componentWillUnmount() {
    this.PostDetailListener.remove();
    window.removeEventListener("keydown", this.handleArrows);
  },

  prevPost() {
    if (PostIndexStore.activePostIndex() > 0) {
      hashHistory.push("posts/" + PostIndexStore.prevId());
    }
  },

  nextPost() {
    hashHistory.push("posts/" + PostIndexStore.nextId());
  },

  render() {
    return(
      <div className="post-show-left">
        <PostDetail post={ this.state.post } prevPost={ this.prevPost } nextPost={ this.nextPost } />
      </div>
    )
  }
});

module.exports = PostShow;
