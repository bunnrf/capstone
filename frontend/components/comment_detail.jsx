const React = require('react');
const TimeUtil = require('../util/time_util');

const CommentDetail = React.createClass({
  render(){
    let comment = this.props.comment;
    return(
      <div className="comment-container">
        <div className="comment-text-container">
          <div className="details">
            <a href={"users/" + comment.commenter.id}>{comment.commenter.username}</a>
            <span> {comment.points} points : { TimeUtil.timeSince(comment.time_since) } </span>
          </div>
          <div className="body">
            { comment.body }
          </div>
        </div>

      </div>
    )
  }
});

module.exports = CommentDetail;
