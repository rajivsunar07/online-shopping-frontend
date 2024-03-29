import axios from 'axios'
import { React, Component } from 'react'
import { BrowserRouter as Router, Switch, NavLink, withRouter } from 'react-router-dom'

import './Header.css'

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: null,
            for: localStorage.getItem('for'),
            is_admin: null
        }

        this.getUser = this.getUser.bind(this)

    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.getUser()
            localStorage.setItem('for', 'buyer')
        }
    }

    getUser = () => {
        axios.get('/user/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                this.setState({
                    userName: res.data.user.name,
                    is_admin: res.data.user.is_admin
                })
            })
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({
            userName: null
        })
        this.props.history.push('/')
    }

    changeFor = (e) => {
        e.preventDefault()

        localStorage.setItem('for', this.state.for == 'seller' ? 'buyer' : 'seller')
        this.setState({
            for: localStorage.getItem('for')
        })
    }

    render() {


        if (this.state.userName != null) {
            var links = (
                <>
                    <li className="nav-item">
                        <a href="#" onClick={this.changeFor} className="nav-link" >Change to {this.state.for == 'seller' ? 'buyer' : 'seller'}</a>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link" >{this.state.userName}</NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={this.logout}>Logout</a>
                    </li>
                </>
            )

            if (this.state.for == 'seller') {
                var user_type_links = (<>
                    <li className="nav-item">
                        <NavLink to="/product/create" className="nav-link" >Create product</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/myproducts" className="nav-link" >My Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" className="nav-link" >Orders (For seller)</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/exchange/request/seller" className="nav-link" >Exchange Requests (Seller) </NavLink>
                    </li>
                </>)
            } else if (this.state.for == 'buyer') {
                var user_type_links = (
                    <>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link" >Cart</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/myorders" className="nav-link" >My orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/exchange/request/user" className="nav-link" >Exchange Requests (Buyer) </NavLink>
                        </li>

                    </>)
            }

        } else {
            var links = <li className="nav-item">
                <NavLink exact className="nav-link" to="/login" >Login</NavLink>
            </li>
        }

        if (this.state.is_admin == true) {
            var admin_links = (<><li className="nav-item">
                <NavLink exact className="nav-link" to="/orders/all" >All orders</NavLink>
            </li>
            </>
            )

        }



        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Hamro Shop</NavLink>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {user_type_links}
                            
                            {admin_links}
                        </ul>
                        <ul className="navbar-nav nav-right">
                        {links}

                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}

export default withRouter(Header)
