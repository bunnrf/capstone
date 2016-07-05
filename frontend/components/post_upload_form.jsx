const React = require('react');
const ImageUploadForm = require('./image_upload_form');
const PostActions = require('../actions/post_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const Modal = require('react-modal');

const LoginForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return { title: "", imageForms: [<ImageUploadForm key={0} />], modalOpen: true };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    this.errorListener.remove();
  },

	handleSubmit(e) {
		e.preventDefault();
		let post = {
			author_id: SessionStore.currentUser().id,
			title: this.state.title,
		  description: this.state.description,
			images: this.getImages()
		};

    PostActions.createPost(post);
		this.closeModal();
	},

	getImages: function() {
		console.log(this.refs);

		return this.refs.map((image) => {
			return { title: image.state.title, url: image.state.url, description: image.state.description}
		})
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

	addImageUploadForm: function(){
		this.setState({ imageForms: this.state.imageForms.concat(<ImageUploadForm key={this.state.imageForms.length}/>) });
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
						<input type="text" value={this.state.description} onChange={this.update("description")} placeholder="Post Title" />
						<div className="post-upload-form">
							{this.state.imageForms}
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

module.exports = LoginForm;
