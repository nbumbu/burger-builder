import React, {Suspense} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})


const App = (props) => {
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
          <Route path="/orders" render={(props) => <Orders {...props}/>} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
        </Suspense>
      </Layout>
    </div>
  )
}

export default App;
