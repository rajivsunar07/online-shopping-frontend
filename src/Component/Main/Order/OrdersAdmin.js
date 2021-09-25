import axios from 'axios'
import React, { Component } from 'react'

export class OrdersAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
    }

    componentDidMount(){
        this.getOrders()
    }

    getOrders = () => {
        axios.get('/order/admin', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.setState({
                    orders: res.data.result
                })
                console.log(this.state.orders)
            })
    }

    render() {
        return (
            <div>
                <table className="table shadow p-3 mb-5 bg-white rounded">
                    <thead>
                        <tr>
                            <th scope="col">Order #</th>
                            <th scope="col">Items #</th>
                            <th scope="col">User Id</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map(order => {
                            return (
                                <tr>
                                    <th scope="row">{order._id}</th>
                                    <td> </td>
                                    <td>{order.user}</td>
                                    <td>{order.total_price}</td>
                                    <td>{order.status}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OrdersAdmin
