const React = require('react');
const UserNav = require('./user_nav');
// const SessionStore = require('../stores/session_store');
// const Modal = require('react-modal');

const Topbar = React.createClass({



  render(){
    return(
      <div id="topbar">
        <div className="nav-container">
          <ul className="nav-left">
            <li><h2>Imagr</h2></li>
            <li><h2>DD</h2></li>
            <li><h3>upload images</h3></li>
          </ul>
          <ul className="nav-right">
            <UserNav />
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Topbar;
