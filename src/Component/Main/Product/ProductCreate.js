import React, { Component } from 'react'
import axios from 'axios';


export class ProductCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            price: null,
            description: null,
            image: [],
            for: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append('name', this.state.name)
        data.append('price', this.state.price)
        data.append('description', this.state.description)

        for (let i = 0; i < this.state.for.length; i++) {
            data.append('for', this.state.for[i])
        }

        for (let i = 0; i < this.state.image.length; i++) {
            data.append('image', this.state.image[i])
        }

        axios.post('/product/', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.message)

                    this.props.history.push('/myproducts/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            [e.target.name]: e.target.files
        })
    }

    handleSelect = (e) => {
        let forList = this.state.for

        if(e.target.checked) forList.push(e.target.id)
        else forList.splice(forList.indexOf(e.target.id), 1)

        this.setState({
            for: forList
        })
    }



    render() {
        return (
            <div className="container border p-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Price" name="price" onChange={this.handleChange} />
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="description" name="description" onChange={this.handleChange} />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="image">Image</label>
                        <input type="file" className="form-control" name="image" onChange={this.handleFile} multiple />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="for">Select for:</label>

                    </div>
                    <div className="form-group m-4">

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="sell" value="sell" onChange={this.handleSelect}/>
                            <label className="form-check-label" for="sell">Sell</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="rent" value="rent" onChange={this.handleSelect} />
                            <label className="form-check-label" for="rent">Rent</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="exchange" exchange="option3" onChange={this.handleSelect} />
                            <label className="form-check-label" for="exchange">Exchange</label>
                        </div>
                    </div>


                    <div className="form-group m-4">

                        <button type="submit" className="btn btn-primary">Create Product</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default ProductCreate
