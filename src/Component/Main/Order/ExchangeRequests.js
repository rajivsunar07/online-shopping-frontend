import React, { Component } from 'react'
import axios from 'axios'

export class ExchangeRequests extends Component {

    constructor(props) {
        super(props)

        this.state = {
            requests: []
        }

    }

    componentDidMount() {
        axios.get(`/exchangeProduct/`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                this.setState({
                    requests: res.data.result
                })
                console.log(this.state)
            })
            .catch(err => {
                console.log('Error in getting exchange requests')
            })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="rounded">
                                <div className="table-responsive table-borderless">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Exchange #</th>
                                                <th>Product name</th>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th>Exchange For</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.requests.map(request => {
                                                return (
                                                    <>
                                                    <tr>
                                                        <td>{request._id}</td>
                                                        <td>{request.name}</td>
                                                        <td><img src={`http://localhost:5000/`+ request.image[0]} alt="" /></td>
                                                        <td>{request.description}</td>
                                                        <td>{request.exchangeFor.name}</td>
                                                        <td><img src={`http://localhost:5000/`+ request.exchangeFor.image[0]} alt="" /></td>
                                                        <td>{String(request.accepted)}</td>
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

export default ExchangeRequests
