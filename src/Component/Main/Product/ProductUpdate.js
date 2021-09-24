import React, { Component } from 'react'
import axios from 'axios';

export class ProductUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            name: null,
            image: [],
            description: null,
            price: null,
            newImages: []
        }

        this.removeImage = this.removeImage.bind(this)
    }


    componentDidMount() {
        axios.get('/product/' + this.props.match.params.id)
            .then(res => {
                let product = res.data.result[0]
                this.setState({
                    _id: product._id,
                    name: product.name,
                    image: product.image,
                    description: product.description,
                    price: product.price
                })
            console.log(this.state.image);
            })
            .catch(err => {
                console.log(err)
            })

    }


    handleSubmit = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append('name', this.state.name)
        data.append('price', this.state.price)
        data.append('description', this.state.description)
        data.append('image', this.state.image)


        for(let i=0; i < this.state.newImages.length ; i++){
            data.append('newImages', this.state.newImages[i])
        }

        axios.patch(`http://localhost:5000/product/${this.state._id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                console.log(res)
                this.props.history.push('/myproducts')
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
            newImages: e.target.files
        })

    }

    removeImage = (e, index) => {
        e.preventDefault()  
        let array = this.state.image

        if(array.length == 1) array = []
        else array.splice(index, 1)

        this.setState({
            image: array
        })
    }


    render() {
        return (
            <div className="container border p-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Price" name="price" onChange={this.handleChange} value={this.state.price} />
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="description" name="description" onChange={this.handleChange} value={this.state.description} />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="image">Image</label>
                        <input type="file" className="form-control" name="image" onChange={this.handleFile} multiple />
                    </div>
                    <div className="row">
                        {this.state.image.map((img, i) => {
                            return(
                                <div className="col-4">
                                    <img src={`http://localhost:5000/${img}`} alt="" />
                                    <br />
                                    <button className="btn btn-danger text-center" onClick={(e) => this.removeImage(e ,i)}>Remove</button>
                                </div>
                            )
                        })}

                    </div>
                    
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
        )
    }
}

export default ProductUpdate
