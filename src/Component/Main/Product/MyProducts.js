import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'


import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export class MyProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }

        this.getProducts = this.getProducts.bind(this)
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get('/product/user/all', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(res => {
            this.setState({
                products: res.data.result
            })
            console.log(this.state)
        })
        .catch(err => {
            console.log('Error in getting products')
        })
    }

    deleteProduct(e, id) {
        e.preventDefault()

        axios.delete(`/product/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                store.addNotification({
                    message: 'Product deleted',
                    type: 'success',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })

            this.getProducts()

                
            })
            .catch(err => {
                console.log('Error in deleting products')
            })

    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10 border shadow p-4">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product #</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.products.map(product => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td> <Link to={`/product/${product._id}`}>{product._id}</Link> </td>
                                                            <td><img src={`http://localhost:5000/` + product.image[0]} alt="" className="tableImage"/></td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.description}</td>
                                                            <td>
                                                                <Link className="btn btn-primary " to={`/product/update/${product._id}`}>Update</Link>
                                                                <button className="btn btn-danger" onClick={(e) => this.deleteProduct(e, product._id)}>Delete</button>
                                                            </td>

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

export default MyProducts
