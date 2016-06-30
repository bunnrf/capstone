const React = require('react');
const ImageDetailHeader = require('./image_detail_header');
const ImageDetailDescription = require('./image_detail_description');

const ImageDetail = React.createClass({
  render(){
    let image = this.props.image;
    return(
      <div className="image-detail-container">
        { image.title ? <ImageDetailHeader text={image.title} /> : null }
        <div className="image-container">
          <img alt src={ image.image_url } />
        </div>
        { image.description ? <ImageDetailDescription text={image.description} /> : null }
      </div>
    )
  }
});

module.exports = ImageDetail;
