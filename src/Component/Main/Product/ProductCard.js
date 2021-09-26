import axios from 'axios';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';


import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

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
            for: 'sell'
        }

        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
            if(res.data.success){

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
            }
        })
        .catch(err => {
            store.addNotification({
                message: 'Failed to add to cart',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
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
            <div className="border m-4 col-7 col-sm-4 col-md-3  col-lg-2 shadow p-4">
                <div>
                <Link to={this.link} className="productLink">
                    <div className=" row d-flex justify-content-center border p-3">
                        <div className="col-10  d-flex justify-content-center">
                            <img className="align-self-center productCardImage" src={'http://localhost:5000/' + this.props.product.image[0]} alt="" />

                        </div>

                   
                    </div>


                    <p className="text-dark mt-2">{this.props.product.name}</p> 
                    <h6 className="text-success">RS. {this.props.product.price}</h6> 
                    
                </Link>
                <button className="btn btn-warning" onClick={this.addToCart}><i class="fas fa-cart-plus"></i>Add to cart</button>
            
                </div>
            </div>
           
            
        
        )

        
    }
}

export default ProductCard
