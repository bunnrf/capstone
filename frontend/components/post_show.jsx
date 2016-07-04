const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndex = require('./post_index');
const PostDetail = require('./post_detail');

const PostShow = React.createClass({
  render(){
    return(
      <div className="single-post-show">
        <div className="post-show-left">
          <PostDetail post={ PostStore.find(this.props.params.postId) } />
        </div>
        <div className="post-show-right">
          <PostIndex className="post-show-post-index-container" postChanged={this._postChanged}/>
        </div>
      </div>
    )
  }
});

module.exports = PostShow;
