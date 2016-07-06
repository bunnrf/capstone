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
const SessionStore = require('./stores/session_store');
const PostIndex = require('./components/post_index');
const PostShow = require('./components/post_show');
const SessionActions = require('./actions/session_actions');
const LoginForm = require('./components/login_form');
const PostUploadForm = require('./components/post_upload_form');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } onEnter={ _ensureUserFetched }>
      <IndexRoute component={ PostIndex } />
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />
      <Route path="/upload" component={ PostUploadForm } onEnter={ _ensureLoggedIn }/>
      <Route path="/posts/:postId" component={ PostShow } />
    </Route>
  </Router>
);

function _ensureUserFetched(nextState, replace, asyncDoneCallback){
  //Any time we render the app, we want to ensure that we have already
  //checked to see if the user is logged in. This should only fire once --
  //when the user first visits our website / after a reload
  if ( SessionStore.currentUserHasBeenFetched() ) {
    //If the current user has already been fetched, we're done.
    asyncDoneCallback();
  } else {
    //If not, initiate the fetch, and pass the asyncDoneCallback to be invoked upon completion
    SessionActions.fetchCurrentUser(asyncDoneCallback);
  }
}

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
