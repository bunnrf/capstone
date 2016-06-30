const React = require('react');

const CommentDetail = React.createClass({

  render(){
    let comment = this.props.comment;
    return(
      <div className="comment-container">
        { comment.commenter.username }
        { comment.body }
      </div>
    )
  }
});

module.exports = CommentDetail;
