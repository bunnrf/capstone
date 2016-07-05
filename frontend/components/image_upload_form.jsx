const React = require('react');
const ImageUploadButton = require('./image_upload_button');

const ImageUploadForm = React.createClass({
  getInitialState: function() {
    return {}
  },

  handleUpload: function(results) {
    this.setState({ url: results.url })
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  render: function() {
    let imageOption;

    if (this.state.url) {
      imageOption = <img src={this.state.url} />
    } else {
      imageOption = <ImageUploadButton postImage={this.handleUpload} />
    }

    return (
      <div className="image-upload-container">
        <input type="text" value={this.state.title} onChange={this.update("title")} placeholder="Caption(optional)" />
        {imageOption}
        <textarea value={this.state.description} onChange={this.update("description")} placeholder="Description(optional)" />
      </div>
    );
  }
});

module.exports = ImageUploadForm;
