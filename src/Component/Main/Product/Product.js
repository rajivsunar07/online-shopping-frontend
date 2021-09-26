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
            <div className="m-4">
                <div className="row justify-content-center">
                    {this.state.products.map( product => {
                        return <ProductCard key={product._id} product={product}></ProductCard>  
                    })}
                </div>
            </div>
        )
    }
}

export default Product
