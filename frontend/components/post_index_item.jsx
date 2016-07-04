const React = require('react');
const hashHistory = require('react-router').hashHistory;

const PostIndexItem = React.createClass({
  handleClick(){
    const postId = this.props.post.id;
    hashHistory.push("posts/" + postId);
    if (this.props.postChanged) {
      this.props.postChanged();
    }
  },

  render(){
    const post = this.props.post;
    return(
      <div key={ post.id } className="post" onClick={ this.handleClick }>
        <img alt src={ post.thumb } />
      </div>
    );
  }
});

module.exports = PostIndexItem;
