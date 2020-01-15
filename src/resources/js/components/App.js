import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import IndexPage from './IndexPage'
import ClientsList from './client/ClientsList'
import EditClient from './client/EditClient'
import NewClient from './client/NewClient'
import DeliveriesList from './delivery/DeliveriesList'
import EditDelivery from './delivery/EditDelivery'
import NewDelivery from './delivery/NewDelivery'
import SingleDelivery from './delivery/SingleDelivery'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={IndexPage} />
            <Route exact path='/clients' component={ClientsList} />
            <Route path='/clients/create' component={NewClient} />
            <Route path='/clients/edit/:id' component={EditClient} />
            <Route exact path='/deliveries' component={DeliveriesList} />
            <Route path='/deliveries/create' component={NewDelivery} />
            <Route path='/deliveries/edit/:id' component={EditDelivery} />
            <Route path='/deliveries/show/:id' component={SingleDelivery} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))