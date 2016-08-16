const Linkify = require('react-linkify');

const ImageDetailDescription = React.createClass({
  render(){
    return(
      <div className="image-detail-description">
        <Linkify>{this.props.text}</Linkify>
      </div>
    )
  }
});

module.exports = ImageDetailDescription;
