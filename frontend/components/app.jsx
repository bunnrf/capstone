const React = require('react');
const Topbar = require('./topbar');
const PostIndex = require('./post_index');
const SessionStore = require('../stores/session_store');

module.exports = React.createClass({
  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render() {
    let context;
    if (this.props.location.pathname === "/") {
      context = "splash";
    } else {
      context = "post";
    }

    // used before storing active post index in post store
    // { this.props.children ? React.cloneElement(this.props.children, { updateActive: this.updateActive } ) : undefined }
    return(
      <div>
        <Topbar />
        <div className={ context === "splash" ? "splash-content" : "single-post-show" }>
          { this.props.children }
          <PostIndex context={ context }/>
        </div>
      </div>
    )
  }
});
