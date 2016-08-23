const SessionStore = require('../stores/session_store');
const PostActions = require('../actions/post_actions');

const CommentCreate = React.createClass({
  getInitialState() {
    return { focused: false };
  },

  focus() {
    this.setState( { focused: true } );
  },

  blur(e) {
    if (e.relatedTarget && e.relatedTarget.id === "submit") {
      this.submit();
    } else {
      this.setState( { focused: false } );
    }
  },

  submit() {
    if (SessionStore.isUserLoggedIn()) {
      const comment = Object.assign(
        {},
        { body: this.state.body, commenter_id: SessionStore.currentUser().id, post_id: this.props.postId, parent_comment_id: this.props.parentCommentId }
      );
      PostActions.createComment(comment);
      this.setState( { body: "", focused: false } );
      if (this.props.commentAdded) {
        this.props.commentAdded();
      }
    } else {
      $(".signin-link")[0].click();
    }
  },

  updateBody() {
    return (e) => this.setState( { body: e.target.value } );
  },

  render() {
    if (this.state.focused) {
      return (
        <div className="comment-create-focused">
          <textarea placeholder="Submit a comment" onChange={ this.updateBody() } onBlur={ this.blur } value={ this.state.body } />
          <button id="submit" onClick={ this.submit } >Submit</button>
        </div>
      );
    } else {
      return (
        <div className="comment-create">
          <textarea placeholder="Submit a comment" onFocus={ this.focus } value={ this.state.body } />
        </div>
      );
    }
  }
});

module.exports = CommentCreate;
