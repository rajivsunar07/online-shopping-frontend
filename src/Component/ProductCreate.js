import React, { Component } from 'react'
import axios from 'axios';

export class ProductCreate extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: null,
            price: null,
            description: null,
            image: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append('name', this.state.name)
        data.append('price', this.state.price)
        data.append('description', this.state.description)
        data.append('image', this.state.image)

        axios.post('http://localhost:5000/product/', data)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        })
    }



    render() {
        return (
            <div className="container border p-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange}/>
                      </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Price" name="price" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="description" name="description" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="image">Image</label>
                        <input type="file" className="form-control" name="image" onChange={this.handleFile}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Product</button>
                </form>
            </div>
        )
    }
}

export default ProductCreate
