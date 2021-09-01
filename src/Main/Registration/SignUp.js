import { React, Component } from "react";
import axios from 'axios';

class SignUp extends Component {

    // runs at the start of all other things
    constructor(props){
        super(props)

        // the state of this component, all the required variables
        this.state = {
            email: null,
            password: null,
            name: null
        }
    }

    // runs when the data is submitted
    handleSubmit = (e)=> {
        // stops from reloading
        e.preventDefault()

        // connecting to the backend
        axios.post('http://localhost:5000/user/register', this.state)
        .then(res => {
            if(res.data.success){
                console.log('success')
            }
        })
        .catch(err => {
            console.log(err)
        })
       
    }

    // when the data is changed
    handleChange = (e)=>{

        this.setState({
            // name of which input's data is changed and it's value
            [e.target.name] : e.target.value
        })

    }

    render(){
        return(
            <div className="container border p-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-4">
                        <input type="text" className="form-control" placeholder="Full name / Organization Name" name="name" onChange={this.handleChange}/>
                      </div>
                    <div className="form-group m-4">
                        <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group m-4">
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }

    
    
}

export default SignUp