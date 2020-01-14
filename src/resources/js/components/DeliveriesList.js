import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DeliveriesList extends Component {
  constructor () {
    super()
    this.state = {
      deliveries: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    axios.get('/api/deliveries').then(response => {
      this.setState({
        deliveries: response.data
      })
    })
  }


  handleSubmit (deliveryId) {
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
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All deliveries</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/deliveries/create'>
                  Create new delivery
                </Link>
                <ul className='list-group list-group-flush'>
                  {deliveries.map(delivery => (
                    <li
                      className='list-group-item d-flex justify-content-between'
                      key={delivery.id}
                    >
                      {delivery.client.name} | {delivery.date}

                        <form onSubmit={this.handleSubmit(delivery.id)}>
                          <Link
                            to={`/deliveries/show/${delivery.id}`}
                            className="btn btn-primary"
                          >
                            Show
                          </Link>
                          <Link
                            to={`/deliveries/edit/${delivery.id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                         <input type="submit" value="Delete" className="btn btn-danger"/>
                       </form>
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

export default DeliveriesList