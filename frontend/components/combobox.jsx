const Combobox = React.createClass({
  getInitialState() {
    return { focused: false, selected: this.props.selected };
  },

  componentWillReceiveProps(newProps) {
    this.setState( { focused: false, selected: newProps.selected } );
  },

  focus() {
    this.setState( { focused: true } );
  },

  blur() {
    this.setState( { focused: false } );
  },

  // unused
  selection() {
    return(
      <div className="selection">
        { this.state.selected }
      </div>
    )
  },

  menu() {
    const options = this.props.options.slice();
    const selected = options.splice(options.indexOf(this.state.selected), 1);
    return(
      <div className="menu">
        <div className="selected-item">
          { selected[0] }
        </div>
        { options.map((option) => {
          return <div className="item" onClick={ this.props.update.bind(this, option) }>
            { option }
          </div>
        }) }
      </div>
    )
  },

  // Use onclick to set focused state instead of onfocus because focus event isnt triggered
  // after selected state changed.
  render() {
    return(
      <div className={ this.props.className } onClick={ this.focus } onBlur={ this.blur } tabIndex="0">
        <div className="selection">
          { this.state.selected }
        </div>
        { this.state.focused ? this.menu() : undefined }
      </div>
    )
  }
});

module.exports = Combobox;
