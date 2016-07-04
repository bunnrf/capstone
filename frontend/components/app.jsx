const React = require('react');
const Topbar = require('./topbar');
const SessionStore = require('../stores/session_store');

const App = React.createClass({
  componentDidMount(){
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render(){
    return(
      <div>
        <Topbar />
        {this.props.children}
      </div>
    )
  }
})

module.exports = App;
