const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Modal = require('react-modal');

const App = require('./components/app');
const PostStore = require('./stores/post_store');
const PostIndex = require('./components/post_index');
const PostShow = require('./components/post_show');
const SessionActions = require('./actions/session_actions');
const LoginForm = require('./components/login_form');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ PostIndex } />
      // <Route path="/login" component={ LoginForm } />
      // <Route path="/signup" component={ LoginForm } />
      <Route path="/posts/:postId" component={ PostShow } />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()){
    replace('/login');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.currentUser){
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  Modal.setAppElement(document.body);
  ReactDOM.render(appRouter, document.getElementById('content'));
})
