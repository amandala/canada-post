import React, { Component } from 'react';

const Modal = require('boron/OutlineModal');

var contentStyle = {
  margin: '20px'
};

class AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      street : '',
      city : '',
      province : '',
      country : '',
      postcode : ''
    }
  }

  updateState(event){
    event.preventDefault();

    this.setState({
      street : this.refs.street.value,
      city : this.refs.city.value,
      province : this.refs.province.value,
      country : this.refs.country.value,
      postcode : this.refs.postcode.value
    });
  }

  componentDidUpdate() {
    if(this.state.street !== '') {
      this.refs.Modal.show();
    }
  }


  render() {
    return (
      <div>
        <div className="AutoComplete__instructions">
          <h2 className="AutoComplete__heading">Out of the box imlpementation with Canada Post branding and functionality.</h2>
          <p className="AutoComplete__message">Start typing in the 'Street address' field to get suggestions.</p>
          <p className="AutoComplete__message">The API automatically detects your country and gives suggestions based on the prediction.</p>
        </div>
        <form className="AutoComplete" onSubmit={(e) => this.updateState(e)}>
          <input className="AutoComplete__field" id="street" type="text" placeholder="Street address" ref="street" />
          <input className="AutoComplete__field" id="city" type="text" placeholder="City"  ref="city" />
          <input className="AutoComplete__field" id="province" type="text" placeholder="State/Province" ref="province" />
          <input className="AutoComplete__field" id="country" type="text" placeholder="Country" ref="country" />
          <input className="AutoComplete__field" id="postcode" type="text" placeholder="Zip/Postcode" ref="postcode" />

          <input className="AutoComplete__button" type='submit' value='Verify' />
        </form>

        <Modal ref="Modal" contentStyle={contentStyle} >
          <div className="Modal">
            <h1 className='Modal__heading'>Success!</h1>
            <p className='Modal__text'>{this.state.street}, {this.state.city}</p>
            <p className='Modal__text'>{this.state.province}, {this.state.country}, {this.state.postcode}</p>
          </div>
        </Modal>

      </div>
    );
  }
}

export default AutoComplete;
