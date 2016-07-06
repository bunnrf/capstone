const React = require('react');
const SessionStore = require('../stores/session_store');
const PostActions = require('../actions/post_actions');

const CommentCreate = React.createClass({
  getInitialState() {
    return { focused: false };
  },

  revealSubmit() {
    this.setState( { focused: true } );
  },

  submit() {
    console.log(this.state.body);
    const comment = Object.assign(
      {},
      { body: this.state.body, commenter_id: SessionStore.currentUser().id, commentable_id: this.props.postId, commentable_type: "Post" }
    );
    PostActions.createComment(comment);
    this.setState( { body: undefined, focused: false } );
  },

  updateBody() {
    return (e) => this.setState( { body: e.target.value } );
  },

  render: function() {
    if (this.state.focused) {
      return (
        <div className="comment-create-focused">
          <textarea placeholder="Submit a comment" onChange={ this.updateBody() } value={ this.state.body } />
          <button onClick={ this.submit } >Submit</button>
        </div>
      );
    } else {
      return (
        <div className="comment-create">
          <textarea placeholder="Submit a comment" onFocus={this.revealSubmit} />
        </div>
      );
    }
  }

});

module.exports = CommentCreate;
