import {Component} from 'react'

class Example extends Component {

    constructor(props){
        super(props)

        this.state = {
            count: 1
        }
    }
    

    increase = ()=> {
       this.setState({
           count: this.state.count + 1
       })
    }

    render(){
        return(
            <div>
                <p>{this.state.count}</p>

                <button onClick={this.increase}>Increase</button>
            </div>
        )
    }
}

export default Example;