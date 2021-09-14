import { React, Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './User/SignUp';
import Login from './User/Login';
import Product from './Product/Product';
import ProductCreate from './Product/ProductCreate';
import ProductDetail from './Product/ProductDetail';
import Cart from './Order/Cart';
import MyOrders from './Order/MyOrders';
import ExchangeRequest from './Order/ExchangeRequest';



export class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Product} />
                    <Route exact path="/product/create" component={ProductCreate} />
                    <Route exact path="/product/:id" component={ProductDetail}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/myorders" component={MyOrders}/>
                    <Route exact path="/exchange/request/:id" component={ExchangeRequest}/>
                </Switch>
            </div>
        )
    }

}

export default Main
