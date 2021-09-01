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
            <div>
                <form onSubmit={this.handleSubmit}> 
                    <input type="text" placeholder="Email Address" name="email" onChange={this.handleChange} />
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;