import { React, Component } from "react";
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: null,
            password: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/user/login', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="container border p-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-4">
                        <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group m-4">
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;