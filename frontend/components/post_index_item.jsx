const React = require('react');
const hashHistory = require('react-router').hashHistory;

const PostIndexItem = React.createClass({
  handleClick(){
    hashHistory.push("posts/" + this.props.post.id);
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
