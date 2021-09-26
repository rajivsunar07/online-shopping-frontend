import React, { Component } from 'react'
import axios from 'axios'

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


export class ProfileUpdateForm extends Component {


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
                console.log(user)
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

    updateProfile = (e) => {
        e.preventDefault()

        let data = new FormData()

        data.append('name', this.state.name)
        data.append('email', this.state.email)
        data.append('phone', this.state.phone)
        data.append('image', this.state.image)

        axios.patch('/user/', data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.props.history.push('/profile/')
            })
            .catch(err => {

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
            <div>
                <div class="container rounded bg-white mt-5 mb-5 border shadow pl-4">
                <h4 className="m-4">Update profile</h4>
 
 <hr/>
                    <div class="row pl-4 justify-content-center">
                        <div class="col-10 border-right">
                        
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h4 class="text-right">Profile Settings</h4>
                                </div>
                                <div class="row mt-2">
                                    <input type="text" class="form-control" placeholder="Full name" name="name" defaultValue={this.state.name} onChange={this.handleChange}/>
                                </div>
                                <div class="row mt-3">
                                    <input type="text" class="form-control" placeholder="Enter phone number" defaultValue={ this.state.phone == "undefined" ? "": this.state.phone } onChange={this.handleChange}/>
                                    <input type="text" class="form-control" placeholder="Enter address" defaultValue={ this.state.address == "undefined" ? "": this.state.address } onChange={this.handleChange}/>
                                    <input type="text" class="form-control" placeholder="Enter email address" defaultValue={this.state.email}  onChange={this.handleChange}/>
                                </div>
                                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <input type="file" name="image" onChange={this.handleFile}/>
                        
                            </div>
                                <div class="mt-5 text-center"><button class="btn btn-primary " type="button" onClick={this.updateProfile}>Save Profile</button></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileUpdateForm
