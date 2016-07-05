const React = require('react');
const UserNav = require('./user_nav');
const Link = require('react-router').Link;

const Topbar = React.createClass({

  render(){
    return(
      <div id="topbar">
        <div className="nav-container">
          <ul className="nav-left">
            <li><h2>Imagr</h2></li>
            <li><h2>DD</h2></li>
            <li><Link to="/upload" className="navigation-link">upload images</Link></li>
          </ul>
          <UserNav />
        </div>
      </div>
    )
  }
});

module.exports = Topbar;
