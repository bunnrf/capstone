const React = require('react');
const Topbar = require('./topbar');

const App = React.createClass({
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
