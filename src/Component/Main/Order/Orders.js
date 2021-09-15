import React, { Component } from 'react'
import axios from 'axios'

export class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ordersItems: [],
        }
    }

    componentDidMount() {
        axios.get('/order/seller/ordered', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                if (res.data.result.length > 0) {
                    this.setState({
                        ordersItems: res.data.result
                    })
                    console.log(this.state)
                } else {
                    console.log('No orders')
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
                                                <th>Product name</th>
                                                <th>Product image</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.ordersItems.map(item => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{item._id}</td>
                                                            <td>{item.product.name}</td>
                                                            <td><img src={`http://localhost:5000/`+ item.product.image[0]} alt="" /></td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>

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

export default Orders
