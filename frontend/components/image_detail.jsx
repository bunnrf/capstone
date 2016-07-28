const React = require('react');
const ImageDetailHeader = require('./image_detail_header');
const ImageDetailDescription = require('./image_detail_description');

const Player = props => {
   let videourl = props.videourl.replace('.gifv', '.mp4');
   return <video src={ videourl } loop autoPlay />;
};

const ImageDetail = React.createClass({
  render(){
    let image = this.props.image;
    let display = ((image.image_url.endsWith('.gifv') || image.image_url.endsWith('.gif')) ? <Player videourl={ image.image_url } /> : <img alt src={ image.image_url } />)

    return(
      <div className="image-detail-container">
        { image.title ? <ImageDetailHeader text={image.title} /> : null }
        <div className="image-container">
          {display}
        </div>
        { image.description ? <ImageDetailDescription text={image.description} /> : null }
      </div>
    )
  }
});

module.exports = ImageDetail;
