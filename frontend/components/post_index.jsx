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

  },

  render() {
    // debugger
    const posts = this.state.posts;
    const keys = Object.keys(posts);

    if (this.props.className) {
        return(
          <div className="post-show-right">
            <div className="post-show-post-index-header">
              header
            </div>
            <div className="post-show-right-scroll-container">
              <div className={this.props.className}>
                {keys.map((key) => {
                  return <PostIndexItem key={ key } post={ posts[key] } />;
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
