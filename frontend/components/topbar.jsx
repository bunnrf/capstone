const React = require('react');
const UserNav = require('./user_nav');
const ImageUploadForm = require('./image_upload_form');
const PostActions = require('../actions/post_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const Modal = require('react-modal');

const Topbar = React.createClass({
  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return { title: "",
        description: "",
				images: [],
				uploadTrigger: false,
				modalOpen: false,
        menuOpen: false };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    this.errorListener.remove();
  },

	handleSubmit(e) {
    const images = this.state.images.slice();

    // resetting ordinal here because strange things happen when it is
    // maintained after deletion
    let i = 0;
    images.map((image) => {
      image["ordinal"] = i;
      i++;
    });

		this.setState({ uploadTrigger: true });
		e.preventDefault();
		let post = {
			author_id: SessionStore.currentUser().id,
			title: this.state.title,
			images_attributes: this.state.images
		};

    PostActions.createPost(post);
		this.closeModal();
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors("post_upload");

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={  i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  openModal() {
    $("body").addClass("noscroll");
    if (SessionStore.isUserLoggedIn()) {
      this.setState( { modalOpen: true } );
    } else {
      // this is awful
      $(".signin-link")[0].click();
    }
  },

	closeModal: function() {
    $("body").removeClass("noscroll")
    this.setState({ modalOpen: false });
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value });
  },

	updateImage(index, property, value) {
		let images = this.state.images.slice();
    images[index][property] = value;

		this.setState( { images: images } );
	},

  removeImage(index) {
    let images = this.state.images.slice();
    images.splice(index, 1);

    // resetting ordinal here has strange effects, can't explain
    // images var is what we want when logged, but image displayed is wrong
    // for (let i = index; i < images.length; i++) {
    //   images[i]["ordinal"] = i;
    // }
    // console.log(images);

    this.setState( { images: images } );
  },

	addImageUploadForm: function() {
		this.setState({ images: this.state.images.concat( { title: undefined, image_url: null, description: undefined, ordinal: this.state.images.length } ) });
	},

  toggleMenuDisplay: function() {
    $(".menu-list").css("display", this.state.menuOpen ? "none" : "flex");
    this.setState( { menuOpen: !this.state.menuOpen } );
  },

  customStyle: function() {
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
    return(
      <div id="topbar">
        <div className="nav-container">
          <ul className="main-nav">
            <li className="logo-container"><a href="#/" className="logo">imagr</a></li>
            <li className="menu-container"><a className="menu-icon" onClick={ this.toggleMenuDisplay }><div></div><div></div><div></div></a></li>
            <li className="upload-container"><div className="upload-button" onClick={ this.openModal }>upload images</div></li>
            <div className="menu-list">
              <div><a href="#/">Home</a></div>
              <div><a href="">About</a></div>
              <div><a href="https://github.com/bunnrf/imagr">GitHub</a></div>
            </div>
          </ul>
          <UserNav />
        </div>

        <Modal className="upload-modal" isOpen={ this.state.modalOpen } onRequestClose={ this.closeModal } style={ this.customStyle() }>
  				<button className="close-modal" onClick={ this.closeModal }>X</button>
  				<div className="post-upload-form-container">
  					<form onSubmit={ this.handleSubmit } className="post-upload-form-box">
  						Share your images!
  		        { this.fieldErrors("base") }
  						<input type="text" value={ this.state.title } onChange={ this.update("title") } placeholder="Post Title" />
  						<div className="post-upload-form">
  							{ this.state.images.map((image) => {
  								return <ImageUploadForm key={ image.ordinal }
  																			title={ image.title }
  																	image_url={ image.url }
  																description={ image.description }
  																updateState={ this.updateImage }
  																		ordinal={ image.ordinal }
                                  removeImage={ this.removeImage } />
  							  }) }
  							<div className="add-image-button" onClick={ this.addImageUploadForm }><span className="glyphicon glyphicon-plus"></span></div>
                <textarea value={ this.state.description } onChange={ this.update("description") } placeholder="Post Description(optional)" />
  							<input type="submit" value="Submit Post" />
  						</div>
  					</form>
  				</div>
  			</Modal>
      </div>
    )
  }
});

module.exports = Topbar;
