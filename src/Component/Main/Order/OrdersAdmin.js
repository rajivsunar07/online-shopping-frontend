import axios from 'axios'
import React, { Component } from 'react'

export class OrdersAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }

        this.getOrders = this.getOrders.bind(this)
        this.updateOrder = this.updateOrder.bind(this)

    }

    componentDidMount() {
        this.getOrders()
    }

    getOrders = () => {
        axios.get('/order/admin', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.setState({
                    orders: res.data.result
                })
            })
    }

    updateOrder = (id) => {
        axios.patch(`/order/${id}`, {status: 'completed'}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => {
            this.getOrders()
        })
        .catch(err => {

        })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">

                    {this.state.orders.map(order => {
                        return (
                            <>
                                <div className="row border shadow-sm m-3 p-4">
                                    <h3>OrderId: {order._id}</h3>
                                    <h4>Total Price: {order.total_price}</h4>

                                    <h4>Items:</h4>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Item #</th>
                                                <th scope="col">Item Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total Price</th>
                                                <th scope="col">For</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.item.map(i => {
                                                return (
                                                    <tr className="text-start">
                                                        <td>{i._id}</td>
                                                        <td>{i.product.name}</td>
                                                        <td className="col-2"><img className="tableImage" src={'http://localhost:5000/' + i.product.image[0]} ></img></td>
                                                        <td className="col">
                                                            <div className="row text-muted"> &#x20A8; {i.product.price}</div>
                                                        </td>
                                                        <td className="col">
                                                            {i.for == 'sell' ? (
                                                                <>
                                                                    <span className="ml-3 mr-3 p4">{i.quantity}</span>
                                                                </>
                                                            ) : <>1</>}
                                                        </td>
                                                        <td className="col">
                                                            <div className="row text-muted"> &#x20A8; {i.price}</div>
                                                        </td>
                                                        <td className="col">
                                                            <span className="close">{i.for}</span>
                                                            {i.for == 'exchange' ? (
                                                                <>
                                                                    <h5 className="mt-4">Exchange for: </h5>
                                                                    <div>{i.exchangeFor.name}</div>
                                                                    <img className="" src={'http://localhost:5000/' + i.exchangeFor.image[0]} width="100px"></img>
                                                                </>) : <></>}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    <h4>Checkout: </h4>
                                    <span><h5>Address: {order.checkout.address}</h5> <h5>Phone: {order.checkout.phone}</h5></span>
                                    <div className="d-flex justify-content-end">
                                        {order.status == "completed" ? <h6>Completed</h6>: 
                                        <button className="btn btn-success" onClick={() => this.updateOrder(order._id)}>Delivered</button>  }
                                    </div>
                                </div>
                            </>
                        )
                    })}


                </div>
            </div>
        )
    }
}

export default OrdersAdmin
