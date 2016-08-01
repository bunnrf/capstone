const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const SentenceSorting = require('./sentence_sorting');

const INITIAL_REQUEST_SIZE = 40;
const ADDITIONAL_REQUEST_SIZE = 20;

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all(), activePostIndex: this.props.activePostIndex }
  },

  _onChange() {
    this.setState( { posts: PostStore.all() } );
  },

  componentDidMount() {
    if (!this.props.className) {
      window.addEventListener('scroll', this._onScroll);
    }
    this.postsListener = PostStore.addListener(this._onChange);
    PostActions.fetchPosts(INITIAL_REQUEST_SIZE, 0);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll);
    this.postsListener.remove();
  },

  componentWillReceiveProps(newProps) {
    this.setState( { activePostIndex: newProps.activePostIndex } );
  },

  _fetchMorePosts(offset) {
    PostActions.fetchPosts(ADDITIONAL_REQUEST_SIZE, offset);
  },

  _onScroll(e) {
    const scrollDif = $('#post-index').height() - (window.scrollY + window.innerHeight);

    if (PostStore.hasMorePosts() && scrollDif < 300) {
      // this.setState({loading: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  _onSideScroll() {
    const scrollTop = $(".post-show-right-scroll-container").scrollTop();
    const scrollDif = $(".post-show-post-index-container").height() - scrollTop;

    if (PostStore.hasMorePosts() && scrollDif < 700) {
      // this.setState({loading: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  render() {
    // debugger
    const posts = this.state.posts;
    const keys = Object.keys(posts);
    const activeKey = keys[this.state.activePostIndex];

    if (this.props.className) {
        return(
          <div className="post-show-right">
            <div className="post-show-post-index-header">
              <h2>Most Viral Images</h2>
              <h3>sorted by popularity</h3>
            </div>
            <div id="post-index" className="post-show-right-scroll-container" onScroll={ this._onSideScroll }>
              <div className={ this.props.className }>
                {keys.map((key) => {
                  return <PostIndexItem key={ key } post={ posts[key] } active={ key === activeKey ? true : false } />;
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
              return <PostIndexItem key={ key } post={ posts[key] } />;
            })}
          </div>
        </div>
      );
    }
  }
});

module.exports = PostIndex;
