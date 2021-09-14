import React, { Component } from 'react'
import axios from 'axios'

export class MyOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],

        }
    }

    componentDidMount() {
        axios.get('/order/user/all', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                if (res.data.result.length > 0) {
                    this.setState({
                        orders: res.data.result
                    })
                    console.log(this.state)
                } else {
                    alert('No orders')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order #</th>
                                                <th>Company name</th>
                                                <th>Completed</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.orders.map(order => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{order._id}</td>
                                                            <td></td>
                                                            <td>{String(order.completed)}</td>
                                                            <td>{order.total_price}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyOrders
