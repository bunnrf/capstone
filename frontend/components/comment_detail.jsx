const React = require('react');

const CommentDetail = React.createClass({

  timeSince(time_since) {
    let seconds = Math.floor((new Date() - time_since) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },

  render(){
    let comment = this.props.comment;
    return(
      <div className="comment-container">
        <div className="comment-text-container">
          <div className="details">
            <a href={"users/" + comment.commenter.id}>{comment.commenter.username}</a>
            <span> {comment.points} points : { this.timeSince(comment.time_since) } ago</span>
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
