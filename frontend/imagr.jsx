const React = require('react');
const ReactDOM = require('react-dom');
const PostStore = require('./stores/post_store');
const PostIndex = require('./components/post_index');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PostIndex />, document.getElementById('content'));
})
