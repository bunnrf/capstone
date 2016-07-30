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
      this.setState({[property]: e.target.value })
    };
  },

  upload(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, (error, results) => {
      if(!error){
        this.handleUpload(results[0]);
      }
    });
  },

  removeSelf() {
    this.props.removeImage(this.props.ordinal);
  },

  render: function() {
    let imageOption;

    if (this.state.image_url) {
      imageOption = <div className="image-upload-image-container">
        <img src={ this.state.image_url } />
        <div className="image-edit-remove">
          <div className="edit-image-button" onClick={ this.upload }><span className="glyphicon glyphicon-pencil"></span></div>
          <div className="remove-image-button" onClick={ this.removeSelf }><span className="glyphicon glyphicon-trash"></span></div>
        </div>
      </div>;
    } else {
      imageOption = <button className="image-upload-button" onClick={ this.upload }>Upload Image(s)</button>;
    }

    return (
      <div className="image-upload-container">
        <input type="text" value={ this.props.title } onChange={ this.update("title") } placeholder="Image Caption(optional)" />
        <div className="image-upload-image-option-container">
          {imageOption }
        </div>
        <textarea value={ this.props.description } onChange={ this.update("description") } placeholder="Image Description(optional)" />
      </div>
    );
  }
});

module.exports = ImageUploadForm;
