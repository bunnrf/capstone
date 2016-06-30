const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const App = require('./components/app');
const PostStore = require('./stores/post_store');
const PostIndex = require('./components/post_index');
const PostShow = require('./components/post_show');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ PostIndex } />
      <Route path="/posts/:postId" component={ PostShow } />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(appRouter, document.getElementById('content'));
})
