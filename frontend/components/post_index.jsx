const PostIndexStore = require('../stores/post_index_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const SentenceSorting = require('./sentence_sorting');

const INITIAL_REQUEST_SIZE = 40;
const ADDITIONAL_REQUEST_SIZE = 20;

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostIndexStore.all(), context: this.props.context, activePostIndex: this.props.activePostIndex }
  },

  _onChange() {
    this.setState( { posts: PostIndexStore.all() } );
  },

  componentDidMount() {
    if (this.state.context === "splash") {
      window.addEventListener('scroll', this._onScroll);
    }
    this.postsListener = PostIndexStore.addListener(this._onChange);
    PostActions.fetchPosts(INITIAL_REQUEST_SIZE, 0);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll);
    this.postsListener.remove();
  },

  componentWillReceiveProps(newProps) {
    if (this.state.context !== "post" && newProps.context === "post") {
      window.removeEventListener('scroll', this._onScroll);
    }
    if (this.state.context !== "splash" && newProps.context === "splash") {
      window.addEventListener('scroll', this._onScroll);
    }
    this.setState( { context: newProps.context, activePostIndex: newProps.activePostIndex } );
  },

  _fetchMorePosts(offset) {
    PostActions.fetchPosts(ADDITIONAL_REQUEST_SIZE, offset);
  },

  _onScroll(e) {
    const scrollDiff = $('#post-index').height() - (window.scrollY + window.innerHeight);

    if (PostIndexStore.hasMorePosts() && scrollDiff < 300) {
      // this.setState({loading: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  _onSideScroll() {
    const scrollTop = $(".post-show-right-scroll-container").scrollTop();
    const scrollDiff = $(".post-show-post-index-container").height() - scrollTop;

    if (PostIndexStore.hasMorePosts() && scrollDiff < 700) {
      // this.setState({loading: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  render() {
    const posts = this.state.posts;
    const keys = Object.keys(posts);
    const activeKey = keys[PostIndexStore.activePostIndex()];

    if (this.state.context === "post") {
      return(
        <div className="post-show-right">
          <div className="post-show-post-index-header">
            <h2>Most Viral Images</h2>
            <h3>sorted by popularity</h3>
          </div>
          <div id="post-index" className="post-show-right-scroll-container" onScroll={ this._onSideScroll }>
            <div className="post-show-post-index-container">
              {keys.map((key) => {
                return <PostIndexItem key={ key } post={ posts[key] } active={ key === activeKey ? true : false }/>;
              })}
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="post-index-content">
          <SentenceSorting />
          <div id="post-index" className={"post-index-container"}>
            {keys.map((key) => {
              return <PostIndexItem key={ key } post={ posts[key] }/>;
            })}
          </div>
        </div>
      );
    }
  }
});

module.exports = PostIndex;
