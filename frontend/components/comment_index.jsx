const React = require('react');
const CommentDetail = require('./comment_detail');

const CommentIndex = React.createClass({
  render() {
    let commentVotes = currentUser["comment_votes"];
    let voteStatus;

    let comments = this.props.commentsByParent[this.props.parentId].sort((a, b) => {
      return b.points - a.points;
    }).map((childComment) => {
      voteStatus = undefined;
      if (commentVotes && commentVotes[childComment.id]) {
        voteStatus = commentVotes[childComment.id]["vote_type"];
      }
      return <CommentDetail key={ childComment.id } comment={ childComment } postId={ this.props.postId } voteStatus={ voteStatus } commentsByParent={ this.props.commentsByParent } commentVotes={ commentVotes }/>
    });
    console.log(comments);
    return (
      <div className="comment_index">
        { comments }
      </div>
    )
  }
});

module.exports = CommentIndex;
