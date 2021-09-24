import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'

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
            image: []
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
                            image: product.image
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
            seller: this.state.sellerId
        }

        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(result => {
            console.log(result.data.message);
            console.log('Order created and item added sucessfully')
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

        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(result => {
            console.log(result.data.message);
            console.log('Order created and item added sucessfully')
        })
        .catch()
    }


    render() {
        return (
            <div>
                <div className="border p-4 m-4 col-3">
                    {this.state.image.map(img => {
                        return <img className="img img-fluid" src={'http://localhost:5000/' + img} alt="" width="800" />
                    })}
                    <h1>{this.state.name}</h1>
                    <h4 className="text-success">RS. {this.state.price}</h4>
                    <h4 className="">Seller: {this.state.user}</h4>
                    <h4 className="">Description: {this.state.description}</h4>
                    <Link to={`/exchange/request/${this.state._id}/${this.state.sellerId}`}>
                       <button className="btn btn-primary">Request for exchange</button> 
                    </Link>
                    <button className="btn btn-success" onClick={this.addToCart}>Add to cart</button>
                    <button className="btn btn-warning" onClick={this.rent}>Rent</button>
                    
                </div>
              
            </div>
        )
    }
}

export default ProductDetail
