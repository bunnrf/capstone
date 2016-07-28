const React = require('react');
const hashHistory = require('react-router').hashHistory;

const PostIndexItem = React.createClass({
  handleClick(){
    hashHistory.push("posts/" + this.props.post.id);
  },

  render(){
    const post = this.props.post;
    const className = (this.props.active ? "post-active" : "post");

    return(
      <div key={ post.id } className={className} onClick={ this.handleClick }>
        <img alt src={ post.thumb } autoPlay="false" />
      </div>
    );
  }
});

module.exports = PostIndexItem;
