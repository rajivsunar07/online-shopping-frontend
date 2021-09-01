import React, { Component } from 'react'

export class ProductCard extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="border p-4 m-4 col-sm">
                <img className="img-thumbnail" src={'http://localhost:5000/' + this.props.product.image} alt="" width="500dp"/>
               <h1>{this.props.product.name}</h1> 
               <h4 className="text-success">RS. {this.props.product.price}</h4> 
            </div>
        )
    }
}

export default ProductCard
