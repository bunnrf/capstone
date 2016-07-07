const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const ErrorStore = require('../stores/error_store');

const Modal = require('react-modal');

const UserNav = React.createClass({

	DEMO_USERNAME: "user1",
	DEMO_PASSWORD: "password",

	demoLoginHandler(e) {
		e.preventDefault();
		this.setState({ username: "", password: "", mode: "login"});
		let _username = this.DEMO_USERNAME.split("").slice();
		this.fillDemoUsername(_username);
	},

	fillDemoUsername: function(_username) {
		const self = this;
			if (_username.length > 0) {
		 		setTimeout(function() {
			 		self.setState({
				 		username: self.state.username + _username.shift()
			 		});

			 		self.fillDemoUsername(_username);
		 		}, 120);
			} else {
		 		const _password = this.DEMO_PASSWORD.split("").slice();
		 		this.fillDemoPassword(_password);
			}
 	},

	fillDemoPassword: function(_password) {
	 	const self = this;
	 	if (_password.length > 0) {
		 	setTimeout(function() {
			 	self.setState({
				 	password: self.state.password + _password.shift()
			 	});
			 	self.fillDemoPassword(_password);
		 	}, 120);
	 	} else {
		 	const e = { preventDefault: function() {} };
		 	this.handleDemoSubmit(e);
	 	}
	},

	handleDemoSubmit(e) {
	 	e.preventDefault();

	 	const formData = {	username: this.state.username, password: this.state.password };

	 	SessionActions.login(formData);
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return { username: "", password: "", mode: this.props.mode,modalOpen: false };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
			this.closeModal();
      this.context.router.push("/");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = { username: this.state.username, password: this.state.password };

    if (this.state.mode === "login") {
      SessionActions.login(formData);
    } else {
      SessionActions.signup(formData);
    }
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.state.mode);

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  openLogin: function() {
    this.setState( { modalOpen: true, mode: "login" } );
  },

  openSignup: function() {
    this.setState( { modalOpen: true, mode: "sign up" } );
  },

	closeModal: function(){
    this.setState({ modalOpen: false });
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

  render (){
    let navLink;
    if (this.state.mode === "login") {
      navLink = <a onClick={this.openSignup}>sign up instead</a>;
    } else {
      navLink = <a onClick={this.openLogin}>log in instead</a>;
    }

    if (SessionStore.isUserLoggedIn()){
      return (
      		<ul className="user-nav">
      			<li className="header-name">Hi, {SessionStore.currentUser().username}!</li>
      			<li><a className="logout-button" onClick={ SessionActions.logout }>logout</a></li>
      		</ul>
      	);
    } else {
      return (
        <ul className="user-nav">
          <li className="signin-link"><a onClick={this.openLogin} className="navigation-link">sign in</a></li>
          <li className="signup-link"><a onClick={this.openSignup} className="navigation-link">sign up</a></li>
          <Modal className="login-modal" isOpen={this.state.modalOpen} onRequestClose={this.closeModal} style={this.customStyle()}>
    				<button className="close-modal" onClick={this.closeModal}>X</button>
    				<div className="login-form-container">
    					<form onSubmit={this.handleSubmit} className="login-form-box">
    		        Welcome!
    						<br/>
    						Please { this.state.mode } or { navLink }

    		        { this.fieldErrors("base") }
    						<div className="login-form">
    			        <br />
    		          { this.fieldErrors("username") }
    							<input type="text"
    		            value={this.state.username}
    		            onChange={this.update("username")}
    								className="login-input-username"
    								placeholder="Username" />

    			        <br />
    		          { this.fieldErrors("password") }
    		          <input type="password"
    		            value={this.state.password}
    		            onChange={this.update("password")}
    								className="login-input-password"
    								placeholder="Password" />

    			        <br />
    							<input type="submit" value="Submit" />
    						</div>
    						<div id="demo-login" className="modal-submit"	onClick={this.demoLoginHandler}>
    							Demo Login
    					  </div>
    					</form>
    				</div>
    			</Modal>
        </ul>
      );
    }
  }
});

module.exports = UserNav;
