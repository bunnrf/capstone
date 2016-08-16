const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Modal = require('react-modal');

const App = require('./components/app');
const PostIndexStore = require('./stores/post_index_store');
const PostDetailStore = require('./stores/post_detail_store');
const SessionStore = require('./stores/session_store');
const PostIndex = require('./components/post_index');
const PostShow = require('./components/post_show');
const UserShow = require('./components/user_show');
const SessionActions = require('./actions/session_actions');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="/posts/:postId" component={ PostShow } />
      <Route path="/users/:userId" component={ UserShow } />
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
