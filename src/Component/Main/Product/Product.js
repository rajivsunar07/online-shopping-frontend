import axios from 'axios'
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export class Product extends Component {
    constructor(props){
        super(props)

        // all the products that we get from backend
        this.state = {
            products: []
        }
    }
    
    // this function runs automatically in the beginning after constructor
    componentDidMount(){
        // getting data using get request
        axios.get('http://localhost:5000/product/')
        .then(result => {
            this.setState({
                // setting the data to products
                products: result.data.result
            })
        })
        .catch()
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    {/* looping through the list of products */}
                    {this.state.products.map( product => {
                        // the design of the product
                        // key is just necessary
                        // product={product} is how to send data 
                        return <ProductCard key={product.productId} product={product}></ProductCard>  
                    })}
                </div>
            </div>
        )
    }
}

export default Product
