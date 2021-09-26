import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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

    

    changeQuantity = (e, change, id) => {
        e.preventDefault()

        if(change.quantity != 0){
            axios.patch(`/order/item/${id}`, change, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                axios.patch(`/order/${this.state._id}`, change, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                .then(r => {
                    this.getCart()
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }

    removeItem = (e, id) => {
        e.preventDefault()

        axios.delete(`order/item/${id}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(res => {
            this.getCart()
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                <div className="card ">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10 border p-4 shadow rounded m-4">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr className="text-start">
                                                <th>Product name</th>
                                                <th>Image</th>
                                                <th>Individual price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                                <th>For</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.items.map(item => {
                                                return (
                                                <tr className="text-start">
                                                        <td>{item.product.name}</td>
                                                        <td className="col-2"><img className="img-fluid" src={'http://localhost:5000/' + item.product.image[0]}></img></td>
                                                        <td className="col">
                                                            <div className="row text-muted"> &#x20A8; {item.product.price}</div>
                                                        </td>
                                                        <td className="col">
                                                            {item.for == 'sell'? (
                                                                <>
                                                                 <a href="#" onClick={(e) => this.changeQuantity(e, {quantity: item.quantity-1, price: (item.price - item.product.price), total_price: (this.state.total_price - item.product.price )}, item._id)}>-  </a>
                                                             <span className="ml-3 mr-3 p4">{item.quantity}</span>
                                                             <a href="#" onClick={(e) => this.changeQuantity(e, {quantity: item.quantity+1, price: (item.price + item.product.price), total_price: (this.state.total_price + item.product.price )}, item._id)}> +</a> 
                                                                </>
                                                            ): <>1</>}
                                                            
                                                        </td>
                                                        <td className="col">
                                                            <div className="row text-muted"> &#x20A8; {item.price}</div>
                                                        </td>
                                                        <td className="col"> 
                                                            <span className="close">{item.for}</span>
                                                            {item.for == 'exchange' ? (
                                                            <> 
                                                                <h5 className="mt-4">Exchange for: </h5>
                                                                <div>{item.exchangeFor.name}</div>
                                                                <img className="" src={'http://localhost:5000/' + item.exchangeFor.image[0]} width="100px"></img>
                                                            </>): <></>}
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={(e) => this.removeItem(e, item._id)}>Remove</button></td>

                                                </tr>)
                                            })}



                                        </tbody>
                                    </table>
                                </div>
                                
                                <h3 className="text-end p-4">Grand total price: &#x20A8;. <span className="text-success"> {this.state.total_price} </span></h3>
                                <div className="row justify-content-end pr-4">
                                    <Link to={`/orders/checkout/${this.state._id}`} className="row justify-content-end">
                                        <button className="btn btn-success col-3">Order</button>
                                    </Link>
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
