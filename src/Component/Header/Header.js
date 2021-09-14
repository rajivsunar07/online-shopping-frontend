import axios from 'axios'
import { React, Component } from 'react'
import { BrowserRouter as Router, NavLink, withRouter} from 'react-router-dom'

export class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            userName: null
        }

    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            axios.get('http://localhost:5000/user/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
            .then(res => {
                this.setState({
                    userName: res.data.user.name
                })
            })

        }
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        this.props.history.push('/')
    }

    render() {
        if(localStorage.getItem('token')){


            var links = (<>
                            <li className="nav-item">
                                <NavLink to="/product/create" className="nav-link" >Create product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="#" className="nav-link" >{this.state.userName}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/myorders" className="nav-link" >My orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link" onClick={this.logout}>Logout</a>
                            </li>
                          </>)
            
        }else{
            var links = <li className="nav-item">
                            <NavLink exact className="nav-link" to="/login" >Login</NavLink>
                        </li>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Hamro Shop</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {links}
                        </ul>
                    </div>
                </nav>
            </div>
            
        )
    }
}

export default withRouter(Header)
