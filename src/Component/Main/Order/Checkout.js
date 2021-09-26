import axios from 'axios'
import React, { Component } from 'react'

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


export class Checkout extends Component {

    constructor(props){
        super(props)

        this.state = {
            address: null,
            phone: null
        }
    }

    addCheckout = (e) => {
        e.preventDefault()

        axios.post('/checkout/', this.state, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
            this.requestOrder(res.data.result._id)
        })
    }

    requestOrder = (checkoutId) => {

        let data = {
            'status': 'ordered',
            checkout: checkoutId
        }

        axios.patch(`/order/${this.props.match.params.id}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                store.addNotification({
                    message: 'Cart Ordered',
                    type: 'success',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })

                this.props.history.push('/cart')
            })
            .catch(err => {
                console.log(err)
            })

    } 

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                <form onSubmit={this.addCheckout} className="col-8 border p-4">
                    <h3>Checkout</h3>
                    <hr />
                    <div class="mb-3"> 
                        <input type="text" class="form-control" name="address" placeholder="Address" onChange={this.handleChange}/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control"  name="phone" placeholder="Phone Number" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>
               
            </div>
        )
    }
}

export default Checkout
