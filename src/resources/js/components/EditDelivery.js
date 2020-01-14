import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      client_id: '',
      date: '',
      start: '',
      end: '',
      clients: [],
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    const deliveryId = this.props.match.params.id;

    axios.get(`/api/deliveries/edit/${deliveryId}`)
    .then(response => {
      this.setState({
        client_id: response.data.delivery.client_id,
        date: response.data.delivery.date,
        start: response.data.delivery.start,
        end: response.data.delivery.end,
        clients: response.data.clients,
        errors: []
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

  handleUpdate (event) {
    event.preventDefault()

    const { history } = this.props;
    const deliveryId = this.props.match.params.id;

    const delivery = {
      client_id: this.state.client_id,
      date: this.state.date,
      start: this.state.start,
      end: this.state.end
    }

    axios.post(`/api/deliveries/edit/${deliveryId}`, delivery)
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
        <span className='invalid-feedback'>
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
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Update Delivery</div>
              <div className='card-body'>
                <form onSubmit={this.handleUpdate}>
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
                    <label htmlFor='date'>{`Date`}</label>
                    <input
                      id='date'
                      type='text'
                      className={`form-control ${this.hasErrorFor('date') ? 'is-invalid' : ''}`}
                      name='date'
                      value={this.state.date}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('date')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='start'>Start</label>
                    <input
                      id='start'
                      type='text'
                      className={`form-control ${this.hasErrorFor('start') ? 'is-invalid' : ''}`}
                      name='start'
                      value={this.state.start}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('start')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='end'>End</label>
                    <input
                      id='end'
                      type='text'
                      className={`form-control ${this.hasErrorFor('end') ? 'is-invalid' : ''}`}
                      name='end'
                      value={this.state.end}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('end')}
                  </div>
                  <button className='btn btn-primary'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditDelivery