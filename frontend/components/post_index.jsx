const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const SentenceSorting = require('./sentence_sorting');

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all(), activePostIndex: this.props.activePostIndex }
  },

  _onChange() {
    this.setState( { posts: PostStore.all() } );
  },

  componentDidMount() {
    this.postsListener = PostStore.addListener(this._onChange);
    PostActions.fetchAllPosts();
  },

  componentWillUnmount() {
    this.postsListener.remove();
  },

  componentWillReceiveProps(newProps) {
    this.setState( { activePostIndex: newProps.activePostIndex } );
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
            <div className="post-show-right-scroll-container">
              <div className={this.props.className}>
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
          <div className={"post-index-container"}>
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
