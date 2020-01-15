import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DeliveriesList extends Component {
  constructor () {
    super()
    this.state = {
      deliveries: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    axios.get('/api/deliveries').then(response => {
      this.setState({
        deliveries: response.data
      })
    })
  }


  handleDelete (deliveryId) {
    return event => {
      event.preventDefault()

      const { history } = this.props

      axios.post(`/api/deliveries/destroy/${deliveryId}`)
        .then(response => {
          // redirect to the homepage
          history.push('/')
        })
    }
  }

  render () {
    const { deliveries } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <Link
              className='btn btn-primary mb-3 float-right'
              to='/deliveries/create'
            >
              Create new delivery
            </Link>

            <h3 className='mb-3'>All deliveries</h3>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Name</th>
                  <th>date</th>
                  <th width='300'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(delivery => (
                  <tr
                    key={delivery.id}
                  >
                    <td>{delivery.id}</td>
                    <td>{delivery.client.name}</td>
                    <td>{delivery.date}</td>
                    <td>
                      <Link
                        to={`/deliveries/show/${delivery.id}`}
                        className='btn btn-primary mr-2'
                      >
                        Show
                      </Link>
                      <Link
                        to={`/deliveries/edit/${delivery.id}`}
                        className='btn btn-primary mr-2'
                      >
                        Edit
                      </Link>
                       <a
                        className='btn btn-danger'
                        href='#'
                        onClick={this.handleDelete(delivery.id)}
                      >
                        Delete
                      </a>
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

export default DeliveriesList