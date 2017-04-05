import React, { Component } from 'react';
import Select from 'react-select';

import Form from './Form';

// TODO replace with custom styles after bootstrap
import 'react-select/dist/react-select.css';

let debounce = require('debounce');

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      results: [],
      locations: [],
      selected: {}
     }

  }

  handleChange(event) {
    console.log(event)
    this.setState({searchTerm: event}, () => {
      console.log(this.state);
      debounce(this.handleSubmit(), 500);
    });
  }

  handleSubmit() {
    console.log('submitting', this.state.searchTerm);
    let requestUrl = 'http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws?Key=PW15-CR59-AK97-BM29';

    requestUrl += '&SearchTerm=' + encodeURIComponent(this.state.searchTerm);
    requestUrl += '&Country=' + encodeURIComponent('CAN');
    requestUrl += '&MaxResults=' + encodeURIComponent(8);

    fetch(requestUrl)
      .then(response => response.json() )
      .then(data =>  data.Items)
      .then(items => this.setState({results: items}, () => {
        console.log(items)
        let names = this.state.results.map((n) => {
          return {value: n.Id, label: n.Text};
        })
        this.setState({locations: names});
      }) )
  }

  handleSelection(e) {
    let requestUrl = 'http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Retrieve/v2.10/json3.ws?Key=PW15-CR59-AK97-BM29';
    requestUrl += '&Id=' + encodeURIComponent(e.value);

    fetch(requestUrl)
      .then(response => response.json())
      .then(data =>  data.Items)
      .then(items => this.setState({selected: items[0]}))
  }

  render() {
    return (
      <div className="Search">
        <div className="AutoComplete__instructions">
          <h2 className="AutoComplete__heading">Custom imlpementation with no branding.</h2>
          <p className="AutoComplete__message">Start typing in the 'Street address' field to get suggestions.</p>
        </div>
        <Select
          name='search-dropdown'
          options={this.state.locations}
          onInputChange={(e) => this.handleChange(e)}
          placeholder='Search'
          noResultsText={false}
          autofocus={true}
          onChange={(e) => this.handleSelection(e)}
        />
        <Form data={this.state.selected} />
    </div>
    );
  }
}

export default Search;
