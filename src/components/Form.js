import React, { Component } from 'react';

const Modal = require('boron/OutlineModal');

var contentStyle = {
  margin: '20px'
};

class Form extends Component {
 constructor(props) {
   super(props);

   this.state = {
     street: '',
     city: '',
     province: '',
     country: '',
     postal: ''
   }
  }

  componentWillReceiveProps(newProps) {
      this.setState((prevState, newProps) => ({
        street: newProps.data.Line1,
        city: newProps.data.City,
        province: newProps.data.ProvinceName,
        country: newProps.data.CountryName,
        postal: newProps.data.PostalCode
      }) );
  }

  verifyAddress(event) {
    event.preventDefault();
    if(this.state.street !== '') {
      this.refs.Modal.show();
    }
  }

  updateState(name) {
    var change = {};
    change[name.target.id] = name.target.value;
    this.setState((prevState, props) => (change));
  }

  render() {
    return (
      <div>
        <form className="AutoComplete" onSubmit={(e) => this.verifyAddress(e)}>
        <input className="AutoComplete__field" id="street" type="text" placeholder="Street"  value={this.state.street} onChange={(e) => this.updateState(e)} />
        <input className="AutoComplete__field" id="city" type="text" placeholder="City" value={this.state.city} onChange={(e) => this.updateState(e)} />
        <input className="AutoComplete__field" id="province" type="text" placeholder="State/Province" value={this.state.province} onChange={(e) => this.updateState(e)} />
        <input className="AutoComplete__field" id="country" type="text" placeholder="Country" value={this.state.country} onChange={(e) => this.updateState(e)} />
        <input className="AutoComplete__field" id="postal" type="text" placeholder="Zip/Postcode" value={this.state.postal} onChange={(e) => this.updateState(e)} />
        <input className="AutoComplete__button" type='submit' value='Verify' />
      </form>

      <Modal ref="Modal" contentStyle={contentStyle} >
        <div className="Modal">
          <h1 className='Modal__heading'>Success!</h1>
          <p className='Modal__text'>{this.state.street}, {this.state.city}</p>
          <p className='Modal__text'>{this.state.province}, {this.state.country}, {this.state.postal}</p>
        </div>
      </Modal>
      </div>
    )
  }
}

export default Form;
