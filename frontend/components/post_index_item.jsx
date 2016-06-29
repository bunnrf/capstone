const React = require('react');

const PostIndexItem = React.createClass({
  render(){
    const post = this.props.post;
    return(
      <div key="{post.id}" className="post">
        <img alt src={post.thumb} />
      </div>
    );
  }
})

module.exports = PostIndexItem;
