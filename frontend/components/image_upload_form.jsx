const React = require('react');
const ImageUploadButton = require('./image_upload_button');

const ImageUploadForm = React.createClass({
  getInitialState: function() {
    return { image_url: this.props.image_url }
  },

  handleUpload: function(results) {
    this.props.updateState(this.props.ordinal, "image_url", results.url);
    this.setState({ image_url: results.url })
  },

  update(property) {
    return (e) => {
      this.props.updateState(this.props.ordinal, property, e.target.value);
      this.setState({[property]: e.target.value})
    };
  },

  render: function() {
    let imageOption;

    if (this.state.image_url) {
      imageOption = <img src={this.state.image_url} />
    } else {
      imageOption = <ImageUploadButton postImage={this.handleUpload} />
    }

    return (
      <div className="image-upload-container">
        <input type="text" value={this.props.title} onChange={this.update("title")} placeholder="Caption(optional)" />
        {imageOption}
        <textarea value={this.props.description} onChange={this.update("description")} placeholder="Description(optional)" />
      </div>
    );
  }
});

module.exports = ImageUploadForm;
