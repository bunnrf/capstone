const React = require('react');

const ImageDetailDescription = React.createClass({
  render(){
    return(
      <div className="image-detail-description">
        <h2>{this.props.text}</h2>
      </div>
    )
  }
});

module.exports = ImageDetailDescription;
