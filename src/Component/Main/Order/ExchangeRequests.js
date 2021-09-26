import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, withRouter } from 'react-router'

export class ExchangeRequests extends Component {

    constructor(props) {
        super(props)

        this.state = {
            requests: []
        }

        this.getExchangeProducts = this.getExchangeProducts.bind(this)
    }

    componentDidMount() {
        this.getExchangeProducts()
    }

    getExchangeProducts = () => {
        axios.get(`/exchangeProduct/${this.props.match.params.for}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(res => {
            this.setState({
                requests: res.data.result
            })
            console.log(requests)
        })
        .catch(err => {
            console.log('Error in getting exchange requests')
        })
    }



    changeStatus = (id, status) => {
        let data = {
            status: status
        }
        axios.patch(`/exchangeProduct/${id}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data.success)
                this.getExchangeProducts()
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteExchange = (e, id) => {
        axios.delete(`/exchangeProduct/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data.success)
                this.componentDidMount()
            })
            .catch(err => {
                console.log(err)
            })
    }

    addToCart = (e, request) => {
        let formdata = {
            product: request.exchangeFor._id,
            quantity: '1',
            price: '0',
            seller: request.user,
            exchangeFor: request._id,
            for: 'exchange',
        }
    
        axios.post('/order/', formdata, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(result => {
            axios.patch(`/exchangeProduct/${request._id}`, {status: 'added to cart'}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(r => {
                console.log(r.data.success)
                this.getExchangeProducts()

            })
            .catch(err => [
                console.log(err)
            ])


        })
        .catch()

    }
    

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-12 border shadow p-3">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Exchange #</th>
                                                <th>Product name</th>
                                                <th>Image</th>
                                                <th>Exchange For</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                {this.props.match.params.for == "user" ?  <th>Action</th>: <></> }

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.requests.map(request => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{request._id}</td>
                                                            <td>{request.name}</td>
                                                            <td><img src={`http://localhost:5000/` + request.image[0]} alt="" className="tableImage" /></td>
                                                            <td>{request.exchangeFor.name}</td>
                                                            <td><img src={`http://localhost:5000/` + request.exchangeFor.image[0]} className="tableImage"/></td>
                                                            <td>
                                                                {this.props.match.params.for == 'user' ? request.status : (
                                                                    request.status == 'pending' ? (<>
                                                                        <button className="btn btn-success" onClick={() => this.changeStatus(request._id, 'accepted')}>Accept</button>
                                                                        <button className="btn btn-danger" onClick={() => this.changeStatus(request._id, 'rejected')}>Reject</button>
                                                                    </>) : (request.status == "added to cart" ? <>accepted</> : request.status)
                                                                )}
                                                            </td>
                                                            <td>
                                                                {this.props.match.params.for == 'user' ? ( request.status =='accepted' ? (
                                                                <>
                                                                    <button className="btn btn-warning" onClick={(e) => this.addToCart(e, request)}>Add to cart</button>
                                                                    <button className="btn btn-danger" onClick={(e) => this.deleteExchange(e, request._id)}>Delete</button>
                                                                </>): <>{request.status}</>) : <></>}
                                                                
                                                            </td>


                                                        </tr>
                                                    </>
                                                )
                                            })}



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(ExchangeRequests)
