import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Comment from './Comment'

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export class ProductDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            name: null,
            sellerId: null,
            user: null,
            price: null,
            description: null,
            image: [],
            for: []
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/product/${this.props.match.params.id}`)
            .then(result => {
                const product = result.data.result[0]

                axios.get(`http://localhost:5000/user/${product.user}`)
                    .then(result => {
                        var user = result.data.result
                        this.setState({
                            _id: product._id,
                            name: product.name,
                            sellerId: product.user,
                            user: user.name,
                            price: product.price,
                            description: product.description,
                            image: product.image,
                            for: product.for
                        })
                    })
                    .catch(err => {
                        console.log('Error getting user data for the product')
                    })
            })
            .catch(err => {
                console.log('Error in getting product data')
            })

    }

    addToCart = () => {
        console.log(this.state)

        let formdata = {
            product: this.state._id,
            quantity: '1',
            price: this.state.price,
            seller: this.state.sellerId,
            for: 'sell'
        }

        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(result => {
                store.addNotification({
                    message: 'Added to cart',
                    type: 'success',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })
            })
            .catch()

    }

    rent = () => {
        let formdata = {
            product: this.state._id,
            quantity: '1',
            price: this.state.price,
            seller: this.state.sellerId,
            for: 'rent'
        }

        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(result => {
                store.addNotification({
                    message: 'Added to cart',
                    type: 'success',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })
            })
            .catch(err => {
                store.addNotification({
                    message: 'Error in adding to cart',
                    type: 'warning',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })
            })
    }


    render() {



        return (
            <div className="p-4 m-4">
                <div className="row justify-content-center">
                    <div className="col-4 border p-4">
                        {this.state.image.map(img => {
                            return <img key={img} className="productCardImage" src={'http://localhost:5000/' + img} alt="" />
                        })}
                    </div>
                    <div className="col-6 border p-4">

                        <h1>{this.state.name}</h1>
                        <h4 className="text-success">RS. {this.state.price}</h4>
                        <h4 className="">Seller: {this.state.user}</h4>
                        <h4 className="">Description: {this.state.description}</h4>
                        {this.state.for.includes('sell') ? <button className="btn btn-success m-1" onClick={this.addToCart}>Add to cart</button> : <></>}
                        {this.state.for.includes('rent') ? <button className="btn btn-warning m-1" onClick={this.rent}>Rent</button> : <></>}
                        {this.state.for.includes('rent') ? (
                        <Link to={`/exchange/request/${this.state._id}/${this.state.sellerId}`}>
                            <button className="btn btn-primary m-1">Request for exchange</button>
                        </Link>
                        ) : <></>}


                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className="col-11 p-4">
                        <div className="row">
                            <Comment product={this.props.match.params.id}></Comment>
                        </div>
                    </div>

                </div>




            </div>
        )
    }
}

export default ProductDetail
