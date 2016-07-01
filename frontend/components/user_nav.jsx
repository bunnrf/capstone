const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserNav = React.createClass({
  render (){
    if (SessionStore.isUserLoggedIn()){
      return (
      		<hgroup className="header-group">
      			<h2 className="header-name">Hi, {SessionStore.currentUser().username}!</h2>
      			<input className="header-button" type="submit" value="logout" onClick={ SessionActions.logout } />
      		</hgroup>
      	);
      } else {
      return (
        <div className='user-nav'>
          <Link to="/signup" className="navigation-link">Sign Up!</Link>
          <Link to="/login" className="navigation-link">Log In!</Link>
        </div>
      );
    }
  }
});

module.exports = UserNav;
