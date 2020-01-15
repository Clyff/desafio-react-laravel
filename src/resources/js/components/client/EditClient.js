import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditClient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    const clientId = this.props.match.params.id;

    axios.get(`/api/clients/edit/${clientId}`)
    .then(response => {
      this.setState({
        name: response.data.name,
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
    const clientId = this.props.match.params.id;

    const client = {
      name: this.state.name
    }

    axios.post(`/api/clients/edit/${clientId}`, client)
      .then(response => {
        // redirect to the homepage
        history.push('/clients')
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
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <Link
              className='btn btn-primary mb-3 float-right'
              to='/clients'
            >
              List clients
            </Link>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card shadow-sm' style={{ width: '100%' }}>
              <div className='card-header'>Update client</div>
              <div className='card-body'>
                <form onSubmit={this.handleUpdate}>
                  <div className='form-group'>
                    <label htmlFor='name'>Client name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='name'
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
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

export default EditClient