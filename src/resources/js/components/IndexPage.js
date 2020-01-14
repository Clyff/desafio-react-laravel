import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class IndexPage extends Component {
  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Desafio React Laravel</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/clients'>
                  Clients
                </Link>

                <Link className='btn btn-primary btn-sm mb-3' to='/deliveries'>
                  Deliveries
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