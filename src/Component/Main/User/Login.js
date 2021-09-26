import { React, Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, withRouter, Link, Redirect } from "react-router-dom";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
        }


    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/user/login', this.state)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);

                    store.addNotification({
                        message: res.data.message,
                        type: 'success',
                        container: 'bottom-left',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })

                    this.props.history.push('/')
                } else {
                    console.log('Login failed')
                }

            })
            .catch(err => {
                store.addNotification({
                    message: 'Login failed',
                    type: 'warning',
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/product' />
        }
        return (


            <div className="p-4 row justify-content-center">
                <div className="col-9 border shadow p-3 mb-5 bg-white rounded">
                    <div className="row ">
                        <div className="col-6">

                            <div className="row  justify-content-center">
                                <img src="/static/logo.png" alt="" width="300px" className="col-12" />
                            </div>
                        </div>

                        <div className="col-6 p-4">
                            <div>
                                <div className="row justify-content-center">
                                    <h4 className="text-center">Login</h4>
                                </div>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group m-4">
                                        <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group m-4">
                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange} />
                                    </div>
                                    <div className="row justify-content-center p-4 m-0">
                                        <button type="submit" className="btn btn-success">Login</button>
                                    </div>

                                </form>
                                <div className="row text-center">
                                    <h6>No account?</h6>
                                    <Link to='/signup'><h6>Sign Up</h6></Link>
                                </div>
                            </div>







                        </div>

                    </div>




                </div>


            </div>
        )
    }
}

export default withRouter(Login);