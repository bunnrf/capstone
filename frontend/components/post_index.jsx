const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');

const PostIndex = React.createClass({
  getInitialState(){
    return { posts: PostStore.all() }
  },

  _onChange(){
    this.setState( { posts: PostStore.all() } )
  },

  componentDidMount(){
    this.postsListener = PostStore.addListener(this._onChange);
    PostActions.fetchAllPosts();
  },

  componentWillUnmount(){
    this.postsListener.remove();
  },

  render(){
    // debugger
    const posts = this.state.posts;
    const keys = Object.keys(posts);
    return(
      <div className={this.props.className || "post-index-container"}>
        {keys.map((key) => {
          return <PostIndexItem key={ key } post={ posts[key] } />;
        })}
      </div>
    );
  }
});

module.exports = PostIndex;
