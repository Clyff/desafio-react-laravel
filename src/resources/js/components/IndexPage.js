import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class IndexPage extends Component {
  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <h2 className='pb-4'>Desafio React Laravel</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className='col-md-4'>
            <div className='card shadow' style={{ width: '100%' }}>
              <div className='card-header'>Clients</div>
              <div className='card-body'>
                <Link
                  className='btn btn-primary btn-sm mb-3'
                  to='/clients'
                >
                  Manage Clients
                </Link>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card shadow' style={{ width: '100%' }}>
              <div className='card-header'>Deliveries</div>
              <div className='card-body'>
                <Link
                  className='btn btn-primary btn-sm mb-3'
                  to='/deliveries'
                >
                  Manage Deliveries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage