const React = require('react');

const Topbar = React.createClass({

  render(){
    return(
      <div id="topbar">
        <div className="nav-container">
          <ul className="nav-left">
            <li><h2>Imagr</h2></li>
            <li><h2>DD</h2></li>
            <li><h3>upload images</h3></li>
          </ul>
          <ul className="nav-right">

          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Topbar;
