const React = require('react');

const ImageDetailHeader = React.createClass({
  render(){
    return(
      <div className="image-detail-header">
        <h2>{this.props.text}</h2>
      </div>
    )
  }
});

module.exports = ImageDetailHeader;
