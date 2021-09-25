import React, { Component } from 'react'
import axios from 'axios'

export class ExchangeRequestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null,
            description: null,
            image: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log(this.state)
        let data = new FormData()
        data.append('name', this.state.name)
        data.append('description', this.state.description)
        data.append('image', this.state.image)
        data.append('exchangeFor', this.props.match.params.id)
        data.append('seller', this.props.match.params.sellerId)

        axios.post('/exchangeProduct/', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.message)
                    this.props.history.push('/exchange/request/user')
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
            [e.target.name]: e.target.files[0]
        })
    }


    render() {
        return (
            <div className="row justify-content-center">
                <form onSubmit={this.handleSubmit} className="col-6">
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Description" name="description" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="image">Image</label>
                        <input type="file" className="form-control" name="image" onChange={this.handleFile} multiple required />
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary col-4">Request for exchange</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default ExchangeRequestForm
