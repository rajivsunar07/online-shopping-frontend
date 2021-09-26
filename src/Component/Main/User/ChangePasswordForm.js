import axios from 'axios'
import React, { Component } from 'react'

export class ChangePasswordForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            password: null,
            newPassword: null,
            confirmPassword: null
        }
    }

    changePassword = (e) => {
        e.preventDefault()
        if(this.state.newPassword != this.state.confirmPassword ){
            console.log('Password donot match')
            return
        }

        let data = {
            password: this.state.password,
            newPassword: this.state.newPassword
        }

        axios.patch('/user/password', data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            this.props.history.push('/profile')
        })
        .catch(res => {
            console.log(res.data.err)
            console.log(res.data.message)
        })
    }   

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        return (
            <div>
                <div className="border shadow m-4 p-4">
                <h4 className="m-4">Change Password</h4>
                <hr />
 

                <form className="m-4 p-4 ">
                    <div class="mb-3">
                        <input type="password" className="form-control" placeholder="Enter current password" name="password" onChange={this.handleChange} />
                    </div>
                    <div class="mb-3">
                        <input type="password" className="form-control" placeholder="Enter new password" name="newPassword" onChange={this.handleChange}/>
                    </div>
                    <div class="mb-3">
                        <input type="password" className="form-control" placeholder="Confirm new password" name="confirmPassword" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-info" onClick={this.changePassword}>Change Password</button>
                </form>
                </div>

            </div>
        )
    }
}

export default ChangePasswordForm
