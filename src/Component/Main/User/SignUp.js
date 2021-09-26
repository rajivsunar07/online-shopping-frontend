import { React, Component } from "react";
import axios from 'axios';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


import { Link } from "react-router-dom";

class SignUp extends Component {

    // runs at the start of all other things
    constructor(props) {
        super(props)

        // the state of this component, all the required variables
        this.state = {
            email: null,
            password: null,
            name: null,
            confirmPassword: null
        }
    }

    // runs when the data is submitted
    handleSubmit = (e) => {
        // stops from reloading
        e.preventDefault()

        if (this.state.confirmPassword != this.state.password) {
            store.addNotification({
                message: 'Password do not match',
                type: 'warning',
                container: 'bottom-left',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000
                }
            })
        } else {
            let data = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }

            axios.post('/user/register', data)
                .then(res => {
                    if (res.data.success) {
                        store.addNotification({
                            message: res.data.message,
                            type: 'success',                         // 'default', 'success', 'info', 'warning'
                            container: 'bottom-left',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 3000
                            }
                        })
                        this.props.history.push('/login')
                    }
                })
                .catch(err => {
                    store.addNotification({
                        message: 'Registration failed',
                        type: 'warning',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-left',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })
                })


        }

    }

    // when the data is changed
    handleChange = (e) => {

        this.setState({
            // name of which input's data is changed and it's value
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

                        <div className="col-6 p-4 align-middle">
                            <div className="row justify-content-center">
                                <h4 className="text-center">Register</h4>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group m-4">
                                    <input type="text" className="form-control" placeholder="Full name / Organization Name" name="name" onChange={this.handleChange} />
                                </div>
                                <div className="form-group m-4">
                                    <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.handleChange} />
                                </div>
                                <div className="form-group m-4">
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange} />
                                </div>
                                <div className="form-group m-4">
                                    <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} />
                                </div>
                                <div className="row justify-content-center m-4  ">
                                    <button type="submit" className="signupbtn col-12 m-4">Sign Up</button>
                                </div>
                                <div className="row justify-content-center m-4 ">
                                    <h5 className="text-center">Already have an account?</h5>
                                    <Link type="submit" className="btn col-4 text-primary" to="/login">Login</Link>
                                </div>

                            </form>
                        </div>

                    </div>




                </div>


            </div>
        )
    }



}

export default SignUp