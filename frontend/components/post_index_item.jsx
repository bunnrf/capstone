const hashHistory = require('react-router').hashHistory;

const PostIndexItem = React.createClass({
  getInitialState() {
    return { displayInfo: false, postShow: this.props.active !== undefined }
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

    const postInfo = (<div className={ this.state.displayInfo ? "post-info" : "post-info-hidden" }>
      <div className="post-info-top">
        <span>{ post.title }</span>
      </div>
      <div className="post-info-bottom">
        <span>{ post.view_count + " view" + s(post.view_count) } · { post.points + " point" + s(post.points) }</span>
      </div>
    </div>)

    return(
      <div>
        <div className={ className } onClick={ this.handleClick } onMouseOver={ this.showInfo } onMouseLeave={ this.hideInfo }>
          <img alt src={ post.thumb } autoPlay="false" />
          { this.state.postShow ? postInfo : undefined }
        </div>
        { this.state.postShow ? undefined : postInfo }
      </div>
    );
  }
});

function s(count) {
  return (count === 1 ? "" : "s");
}

module.exports = PostIndexItem;
