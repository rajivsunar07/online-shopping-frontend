import axios from 'axios';
import React, { Component } from 'react';
import {Router, Link} from 'react-router-dom';


export class ProductCard extends Component {
    constructor(props){
        super(props)


        this.link = "/product/" + this.props.product._id
    }

    addToCart = () => {

        let formdata = {
            product: this.props.product._id,
            quantity: '1',
            price: this.props.product.price,
            seller: this.props.product.user,
            shipping_address: ' '
        }

        axios.get('/order/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
            if(res.data.result.length > 0){
                axios.post('/order/item/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(result => {
                    console.log(result.data.message)
                })
                .catch(err => {
                    console.log(err)
                    console.log('Error posting data')
                })
            }else{
                axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(result => {
                    console.log(result.data.message);
                    console.log('Order created and item added sucessfully')
                })
                .catch()
            }

            axios.post()
            .then((result) => {
                
            }).catch((err) => {
                
            });
        })
        .catch(res => {
            console.log(res.data.message)
        })

    }

    render() {
        return (
            <div className="border p-4 m-4 col-3">
                <Link to={this.link}>
                    <img className="img-thumbnail" src={'http://localhost:5000/' + this.props.product.image[0]} alt="" width="500dp"/>
                    <h1>{this.props.product.name}</h1> 
                    <h4 className="text-success">RS. {this.props.product.price}</h4> 
                </Link>
                <button className="btn btn-success" onClick={this.addToCart}>Add to cart</button>
            </div>
            
        
        )
    }
}

export default ProductCard