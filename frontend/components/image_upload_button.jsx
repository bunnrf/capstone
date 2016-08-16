
const UploadImageButton = React.createClass({
  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, (error, results) => {
      if(!error){
        this.props.postImage(results[0]);
      }
    });
  },

  render: function() {
    return (
      <button className="image-upload-button" onClick={ this.upload }>Upload Image(s)</button>
    );
  }
});

module.exports = UploadImageButton;
