import { React, Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import SignUp from './User/SignUp';
import Login from './User/Login';
import Product from './Product/Product';
import ProductCreate from './Product/ProductCreate';
import ProductDetail from './Product/ProductDetail';
import ProductUpdate from './Product/ProductUpdate';
import Cart from './Order/Cart';
import MyOrders from './Order/MyOrders';
import ExchangeRequestForm from './Order/ExchangeRequestForm';
import ExchangeRequests from './Order/ExchangeRequests';

import MyProducts from './Product/MyProducts';
import Orders from './Order/Orders';
import OrdersAdmin from './Order/OrdersAdmin';
import Profile from './User/Profile';
import ProfileUpdateForm from './User/ProfileUpdateForm';
import ChangePasswordForm from './User/ChangePasswordForm';





export class Main extends Component {
    render() {
        return (
            <div>
                    <Switch>
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/profile/update/:id" component={ProfileUpdateForm}/>
                        <Route exact path="/profile/password/" component={ChangePasswordForm}/>

                        <Route exact path="/" component={Product} />
                        <Route exact path="/product/create" component={ProductCreate} />
                        <Route exact path="/product/:id" component={ProductDetail}/>
                        <Route exact path="/product/update/:id" component={ProductUpdate}/>
                        <Route exact path="/myproducts" component={MyProducts}/>
                            
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/myorders" component={MyOrders}/>
                        <Route exact path="/orders" component={Orders}/>
                        <Route exact path="/orders/all" component={OrdersAdmin}/>

                        <Route exact path="/exchange/request/:id/:sellerId" component={ExchangeRequestForm}/>
                        <Route exact path="/exchange/request/:for" render={(props) => (<ExchangeRequests key={props.match.params.for}></ExchangeRequests>)} />



                    </Switch>
            </div>
        )
    }

}

export default Main
