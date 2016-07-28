// const React = require('react');
// const Modal = require('react-modal');
//
//
//
//
// const LoginForm = React.createClass({
//
//
//   render() {
//     let navLink;
//     if (this.state.mode === "login") {
//       navLink = <a onClick={this.openSignup}>sign up instead</a>;
//     } else {
//       navLink = <a onClick={this.openLogin}>log in instead</a>;
//     }
//
//     <Modal className="login-modal" isOpen={this.state.modalOpen} onRequestClose={this.closeModal} style={this.customStyle()}>
//       <button className="close-modal" onClick={this.closeModal}>X</button>
//       <div className="login-form-container">
//         <form onSubmit={this.handleSubmit} className="login-form-box">
//           Welcome!
//           <br/>
//           Please { this.state.mode } or { navLink }
//
//           { this.fieldErrors("base") }
//           <div className="login-form">
//             <br />
//             { this.fieldErrors("username") }
//             <input type="text"
//               value={this.state.username}
//               onChange={this.update("username")}
//               className="login-input-username"
//               placeholder="Username" />
//
//             <br />
//             { this.fieldErrors("password") }
//             <input type="password"
//               value={this.state.password}
//               onChange={this.update("password")}
//               className="login-input-password"
//               placeholder="Password" />
//
//             <br />
//             <input type="submit" value="Submit" />
//           </div>
//           <div id="demo-login" className="modal-submit"	onClick={this.demoLoginHandler}>
//             Demo Login
//           </div>
//         </form>
//       </div>
//     </Modal>
//   }
// });
//
// module.exports = LoginForm;
