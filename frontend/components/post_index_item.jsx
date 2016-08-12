const React = require('react');
const hashHistory = require('react-router').hashHistory;

const PostIndexItem = React.createClass({
  getInitialState() {
    return { displayInfo: false }
  },

  handleClick() {
    hashHistory.push("posts/" + this.props.post.id);
  },

  showInfo() {
    this.setState( { displayInfo: true } );
  },

  hideInfo() {
    this.setState( { displayInfo: false } );
  },

  render() {
    const post = this.props.post;
    const className = (this.props.active ? "post-active" : "post");

    return(
      <div>
        <div className={className} onClick={ this.handleClick } onMouseOver={ this.showInfo } onMouseLeave={ this.hideInfo }>
          <img alt src={ post.thumb } autoPlay="false" />
        </div>
        <div className={ this.state.displayInfo ? "post-info" : "post-info-hidden" }>
          <div className="post-info-top">
            <span>{post.title}</span>
          </div>
          <div className="post-info-bottom">
            <span>{post.points} points</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PostIndexItem;
