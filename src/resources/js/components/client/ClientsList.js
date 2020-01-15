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
            <Link
              className='btn btn-primary mb-3 float-right'
              to='/clients/create'
            >
              Create new client
            </Link>

            <h3 className='mb-3'>All clients</h3>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Name</th>
                  <th width='100'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr
                    key={client.id}
                  >
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>
                      <Link
                        to={`/clients/edit/${client.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientsList