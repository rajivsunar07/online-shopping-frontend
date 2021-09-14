import React, { Component } from 'react'
import axios from 'axios'

export class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            item: [],
            total_price: null,
            user: null,
            shipping_address: null,
            ordered: null,
            completed: null
        }
    }

    componentDidMount() {

         axios.get('/order/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data.result)
                if (res.data.result.length > 0) {
                    const order = res.data.result[0]
                    this.setState({
                        _id: order._id,
                        item: order.item,
                        total_price: order.total_price,
                        user: order.user,
                        shipping_address: order.shipping_address,
                        ordered: order.ordered
                    })

                } else {
                    console.log('Nothing added to cart currently')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="row">
                        <div className="col-md-8 cart">
                            <div className="title">
                                <div className="row">
                                    <div className="col">
                                        <h4><b>Shopping Cart</b></h4>
                                    </div>
                                    <div className="col align-self-center text-right text-muted"></div>
                                </div>
                            </div>

                            {this.state.item.map(i => {
                                return (<div className="row border-top border-bottom">
                                    <div className="row main align-items-center">
                                        <div className="col-2"><img className="img-fluid" src={'http://localhost:5000/' + i.product.image[0]}></img></div>
                                        <div className="col">
                                            <div className="row text-muted">{i.product.name}</div>
                                        </div>
                                        <div className="col"> <a href="#">-</a><a href="#" className="border">{i.quantity}</a><a href="#">+</a> </div>
                                        <div className="col">&#x20A8; <span className="close">{i.price}</span></div>
                                    </div>
                                </div>)
                            })}


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Cart
