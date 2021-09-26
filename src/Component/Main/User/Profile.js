import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'


export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            name: null,
            email: null,
            phone: null,
            image: null
        }

        this.getUserData = this.getUserData.bind(this)
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        axios.get('/user/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                const user = res.data.user

                this.setState({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    image: user.image
                })
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="mt-3">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={this.state.image == null || this.state.image == "undefined" ? 'static/user.png' : `http://localhost:5000/${this.state.image}`} alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{this.state.name}</h4>

                                        </div>
                                        <div className="row mt-3">
                                        <div className="col-sm-12">
                                            <div className="row">
                                            <span className="mb-2 mr-3">
                                                <Link className="btn btn-success" to={`/profile/update/${this.state._id}`} >Update Profile</Link>

                                            </span>
                                            </div>
                                            
                                            <span>
                                                <Link className="btn btn-primary" to={`/profile/password/`} >Change Password</Link>

                                            </span>

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.email}

                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.phone != "undefined" ? this.state.phone : <></>}
                                        </div>
                                    </div>
                                    <hr />

                                    
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
