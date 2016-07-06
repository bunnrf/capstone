const React = require('react');
const ImageUploadForm = require('./image_upload_form');
const PostActions = require('../actions/post_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const Modal = require('react-modal');

const PostUploadForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return { title: "",
				images: [],
				uploadTrigger: false,
				modalOpen: true };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
		this.setState({ images: [ { title: undefined, image_url: null, description: undefined, ordinal: 0 } ] });
  },

  componentWillUnmount() {
    this.errorListener.remove();
  },

	handleSubmit(e) {
		this.setState({ uploadTrigger: true });
		console.log("submit");
		e.preventDefault();
		let post = {
			author_id: SessionStore.currentUser().id,
			title: this.state.title,
		  description: this.state.description,
			images_attributes: this.state.images
		};

    PostActions.createPost(post);
		// this.closeModal();
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors("post_upload");

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

	closeModal: function(){
    this.setState({ modalOpen: false });
		this.context.router.push("/");
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

	updateImage(index, property, value) {
		let images = this.state.images;
		images[index][property] = value;

		this.setState( { images: images } );
	},

	addImageUploadForm: function(){
		this.setState({ images: this.state.images.concat( { title: undefined, image_url: null, description: undefined, ordinal: this.state.images.length } ) });
	},

	customStyle: function(){
		return {
		  overlay : {
		    backgroundColor   : 'rgba(0, 0, 0, 0.9)'
		  },
  		content : {
		    position                   : 'absolute',
		    border                     : 'none',
		    background                 : '#2B2B2B',
		    overflow                   : 'auto',
		    WebkitOverflowScrolling    : 'touch',
		    borderRadius               : '0px',
		    outline                    : 'none',
		    padding                    : '20px'
  		}
		}
	},

	render() {
		return (
			<Modal className="upload-modal" isOpen={this.state.modalOpen} onRequestClose={this.closeModal} style={this.customStyle()}>

				<button className="close-modal" onClick={this.closeModal}>X</button>
				<div className="post-upload-form-container">
					<form onSubmit={this.handleSubmit} className="post-upload-form-box">
						Upload Images
		        { this.fieldErrors("base") }
						<input type="text" value={this.state.title} onChange={this.update("title")} placeholder="Post Title" />
						<div className="post-upload-form">
							{this.state.images.map((image) => {
								return <ImageUploadForm key={image.ordinal} title={image.title} image_url={image.url} description={image.description} updateState={this.updateImage} ordinal={image.ordinal} />
							})}
							<input type="button" className="add-image-button" onClick={this.addImageUploadForm} value="Add Image" />
							<textarea value={this.state.description} onChange={this.update("description")} placeholder="Post Description(optional)"></textarea>
							<input type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</Modal>
		);
	}
});

module.exports = PostUploadForm;
