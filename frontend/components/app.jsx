const React = require('react');
const Topbar = require('./topbar');
const PostIndex = require('./post_index');
const SessionStore = require('../stores/session_store');

const App = React.createClass({
  componentDidMount(){
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render(){
    // let postIndex;
    // if (this.props.children) {
    //   postIndex = <PostIndex className="post-show-post-index-container" activePostIndex={ this.props.children.props.params.postId }/>
    // } else {
    //   postIndex = <PostIndex />
    // }

    return(
      <div>
        <Topbar />
        { this.props.children }
      </div>
    )
  }
})

module.exports = App;
