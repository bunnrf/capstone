const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('../actions/error_actions');
const dispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {
  signup: function(user){
    SessionApiUtil.signup(user, this.receiveCurrentUser, ErrorActions.setErrors);
  },

  login: function(user){
    SessionApiUtil.login(user, this.receiveCurrentUser, ErrorActions.setErrors);
  },

  logout() {
    SessionApiUtil.logout(SessionActions.removeCurrentUser);
  },

  fetchCurrentUser(complete){
    SessionApiUtil.fetchCurrentUser(SessionActions.receiveCurrentUser, complete);
  },

  receiveCurrentUser(currentUser) {
    dispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser() {
    dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
    hashHistory.push("/");
  }
};

module.exports = SessionActions;
