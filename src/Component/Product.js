import axios from 'axios'
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export class Product extends Component {
    constructor(props){
        super(props)

        this.state = {
            products: []
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/product/')
        .then(result => {
            this.setState({
                products: result.data.result
            })
        })
        .catch()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.products.map( product => {
                        return <ProductCard key={product.productId} product={product}></ProductCard>  
                    })}
                </div>
            </div>
        )
    }
}

export default Product
