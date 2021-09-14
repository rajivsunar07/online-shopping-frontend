import { React, Component } from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

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
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/')
            }else{
                console.log('Login failed')
            }
            
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
        if(localStorage.getItem('token')){
            return <Redirect to='/product'/>
        }
        return(
            
            <div className="row  justify-content-center p-4 m-0">
                
                <div className="border col-5 p-4">
                    <div className="row  justify-content-center">
                        <img src="/static/logo.png" alt="" width="300px" className="col-8"/>
                    </div>
                    <h3 className="text-center">Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group m-4">
                            <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group m-4">
                            <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange}/>
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
        )
    }
}

export default Login;