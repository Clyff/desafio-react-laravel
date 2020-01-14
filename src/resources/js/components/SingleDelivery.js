import axios from 'axios'
import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { Link } from 'react-router-dom'

class SingleDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      start: '',
      end: '',
      client: {},
      directions: [],
      mapIsReady: 0
    }
  }

  componentDidMount () {
    const deliveryId = this.props.match.params.id;

    axios.get(`/api/deliveries/show/${deliveryId}`)
    .then(response => {
      this.setState({
        date: response.data.date,
        start: response.data.start,
        end: response.data.end,
        client: response.data.client
      });

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: response.data.start.geometry.location,
          destination: response.data.end.geometry.location,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              mapIsReady: 1
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render () {
   const mapIsReady = this.state.mapIsReady;
   let myMap;

    if (mapIsReady === 1) {
      const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { this.state.start.geometry.location }
        defaultZoom = { 7 }
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
      ));

      myMap = <div className='py-4'>
        <GoogleMapExample
          containerElement={ <div className='z-depth-1-half map-container' style={{ height: `500px` }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    }

    return (
      <div className='container'>
        <div className='py-4'>
          <div className="table-responsive-sm">
            <table className="table">
              <tbody>
                <tr>
                  <th>Client</th>
                  <td>{this.state.client.name}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{this.state.date}</td>
                </tr>
                <tr>
                  <th>Start</th>
                  <td>{this.state.start.formatted_address}</td>
                </tr>
                <tr>
                  <th>End</th>
                  <td>{this.state.end.formatted_address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {myMap}
      </div>
    )
  }
}

export default SingleDelivery