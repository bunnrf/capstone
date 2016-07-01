const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserNav = React.createClass({
  render (){
    if (SessionStore.isUserLoggedIn()){
      return (
      		<ul className="user-nav">
      			<li className="header-name">Hi, {SessionStore.currentUser().username}!</li>
      			<li><input className="header-button" type="submit" value="logout" onClick={ SessionActions.logout } /></li>
      		</ul>
      	);
      } else {
      return (
        <ul className="user-nav">
          <li className="signin-link"><Link to="/login" className="navigation-link">sign in</Link></li>
          <li className="signup-link"><Link to="/signup" className="navigation-link">sign up</Link></li>
        </ul>
      );
    }
  }
});

module.exports = UserNav;
