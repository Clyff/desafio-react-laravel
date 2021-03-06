import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import DatePicker from "react-datepicker";
import { getDate, getMonth, getYear } from 'date-fns';

class NewDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      client_id: '',
      date: '',
      start: '',
      end: '',
      calendarDate: '',
      address1: '',
      address2: '',
      clients: [],
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeAddress1 = this.handleChangeAddress1.bind(this)
    this.handleSelectAddress1 = this.handleSelectAddress1.bind(this)
    this.handleChangeAddress2 = this.handleChangeAddress2.bind(this)
    this.handleSelectAddress2 = this.handleSelectAddress2.bind(this)
    this.handleCreateNewDelivery = this.handleCreateNewDelivery.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    axios.get(`/api/clients`)
    .then(response => {
      this.setState({
        clients: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeDate (date) {
    let year = getYear(date);
    let month = getMonth(date) + 1;
    let day = getDate(date);

    if (month < 10) {
      month = '0' + month;
    } if (day < 10) {
      day = '0' + day;
    }

    let converted_date = year + '-' + month + '-' + day;

    this.setState({
      date: converted_date,
      calendarDate: date
    });
  };

  handleChangeAddress1 (address) {
    this.setState({ address1: address });
  };

  handleSelectAddress1 (address) {
    geocodeByAddress(address)
      .then(results => {
        var result = results[0];

        this.setState({
          address1: result.formatted_address,
          start: result
        });
      })
      .catch(error => console.error('Error', error))
  }

  handleChangeAddress2 (address) {
    this.setState({ address2: address });
  };

  handleSelectAddress2 (address) {
    geocodeByAddress(address)
      .then(results => {
        var result = results[0];

        this.setState({
          address2: result.formatted_address,
          end: result
        });
      })
      .catch(error => console.error('Error', error))
  }

  handleCreateNewDelivery (event) {
    event.preventDefault()

    const { history } = this.props

    const delivery = {
      client_id: this.state.client_id,
      date: this.state.date,
      start: this.state.start,
      end: this.state.end
    }

    axios.post('/api/deliveries', delivery)
      .then(response => {
        // redirect to the homepage
        history.push('/deliveries')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback' style={{ display: 'block' }}>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    const { clients } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <Link
              className='btn btn-primary mb-3 float-right'
              to='/deliveries'
            >
              List deliveries
            </Link>

            <div className='card shadow-sm' style={{ width: '100%' }}>
              <div className='card-header'>Create new delivery</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewDelivery}>
                  <div className='form-group'>
                    <label htmlFor='client_id'>Client</label>
                    <select 
                      id='client_id'
                      className={`form-control ${this.hasErrorFor('client_id') ? 'is-invalid' : ''}`}
                      name='client_id'
                      onChange={this.handleFieldChange}
                      value={this.state.client_id}
                    >
                      <option></option>
                      {clients.map(client => (
                        <option
                          key={client.id}
                          value={client.id}
                        >
                          {client.name}
                        </option>
                      ))}
                    </select>
                    {this.renderErrorFor('client_id')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='date'>{`Date`}</label><br />
                    <DatePicker
                      id='date'
                      dateFormat='dd/MM/yyyy'
                      className={`form-control ${this.hasErrorFor('date') ? 'is-invalid' : ''}`}
                      selected={this.state.calendarDate}
                      onChange={this.handleChangeDate}
                    />
                    {this.renderErrorFor('date')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='address1'>Start</label>
                    <PlacesAutocomplete
                      id='address1'
                      value={this.state.address1}
                      onChange={this.handleChangeAddress1}
                      onSelect={this.handleSelectAddress1}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input form-control' + (this.hasErrorFor('start') ? ' is-invalid' : '')
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                  <span>{suggestion.description}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    {this.renderErrorFor('start')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='address2'>End</label>
                    <PlacesAutocomplete
                      id='address2'
                      value={this.state.address2}
                      onChange={this.handleChangeAddress2}
                      onSelect={this.handleSelectAddress2}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input form-control' + (this.hasErrorFor('end') ? ' is-invalid' : '')
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                  <span>{suggestion.description}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    {this.renderErrorFor('end')}
                  </div>
                  <button className='btn btn-primary'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewDelivery