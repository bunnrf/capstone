const React = require('react');

const ImageDetailDescription = React.createClass({
  render(){
    return(
      <div className="image-detail-description">
        <p>{this.props.text}</p>
      </div>
    )
  }
});

module.exports = ImageDetailDescription;
