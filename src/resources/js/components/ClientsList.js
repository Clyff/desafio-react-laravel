import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ClientsList extends Component {
  constructor () {
    super()
    this.state = {
      clients: []
    }
  }

  componentDidMount () {
    axios.get('/api/clients').then(response => {
      this.setState({
        clients: response.data
      })
    })
  }

  render () {
    const { clients } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All clients</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/clients/create'>
                  Create new client
                </Link>
                <ul className='list-group list-group-flush'>
                  {clients.map(client => (
                    <li
                      className='list-group-item d-flex justify-content-between'
                      key={client.id}
                    >
                      {client.name}
                      <Link
                        to={`/clients/edit/${client.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientsList