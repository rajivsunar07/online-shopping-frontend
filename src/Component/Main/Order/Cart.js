import React, { Component } from 'react'
import axios from 'axios'

export class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            items: [],
            total_price: null,
            user: null,
            shipping_address: null,
            status: null
        }

        this.requestOrder = this.requestOrder.bind(this)
    }

    componentDidMount() {

        this.getCart()
    }

    getCart = () => {
        axios.get('/order/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                if (res.data.result.length > 0) {
                    const order = res.data.result[0]
                    this.setState({
                        _id: order._id,
                        items: order.item,
                        total_price: order.total_price,
                        user: order.user,
                        shipping_address: order.shipping_address,
                        status: order.status
                    })
                    console.log(this.state)
                } else {
                    console.log('Nothing added to cart currently')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    requestOrder(e) {
        e.preventDefault()
        let data = {
            'status': 'ordered'
        }

        axios.patch(`/order/${this.state._id}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data.success);
            })
            .catch(err => {
                console.log(err)
            })

        this.getCart()


    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product name</th>
                                                <th>Image</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>For</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.items.map(item => {
                                                return (
                                                <tr>
                                                        <td>{item.product.name}</td>
                                                        <td className="col-2"><img className="img-fluid" src={'http://localhost:5000/' + item.product.image[0]}></img></td>
                                                        <td className="col">
                                                            <div className="row text-muted">{item.product.price}</div>
                                                        </td>
                                                        <td className="col"> <a href="#">-</a><a href="#" className="border">{item.quantity}</a><a href="#">+</a> </td>
                                                        <td className="col">&#x20A8; <span className="close">{item.for}</span></td>
                                                </tr>)
                                            })}



                                        </tbody>
                                    </table>
                                </div>
                                <h3>Total price: {this.state.total_price}</h3>
                                <div className="row">
                                    <button className="btn btn-success col-3" onClick={this.requestOrder}>Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart
