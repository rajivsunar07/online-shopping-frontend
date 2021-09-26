import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router'


import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            description: null,
            userId: null
        }

        this.getComments = this.getComments.bind(this)
        this.getUserId = this.getUserId.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.addComment = this.addComment.bind(this)
    }

    componentDidMount() {
        this.getComments()
        this.getUserId()
    }

    getComments = () => {
        axios.get(`/comment/${this.props.product}`)
            .then(res => {
                this.setState({
                    comments: res.data.result
                })
            })
            .catch(err => {
            })
    }

    addComment = (e) => {
        e.preventDefault()

        console.log(e.target)

        let data = {
            product: this.props.product,
            description: this.state.description
        }

        axios.post('/comment/', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                store.addNotification({
                    message: 'Comment added',
                    type: 'success',                      
                    container: 'bottom-left',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000
                    }
                })

                this.getComments()
                this.setState({
                    description: ""
                })
            })
            .catch(err => console.log(err))

    }

    getUserId = () => {
        axios.get('/user/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                this.setState({
                    userId: res.data.user._id
                })
            })
            .catch(err => console.log(err))
    }

    deleteComment = (e, id) => {
        e.preventDefault()

        axios.delete(`/comment/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                if (res.data.success) {
                    store.addNotification({
                        message: 'Comment deleted',
                        type: 'success',                      
                        container: 'bottom-left',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })

                    this.getComments()
                }
            })
            .catch(err => console.log(err))



    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {


        return (
            <div>
                <div className="border">

                    <form className="p-4 row justify-content-center" onSubmit={this.addComment}>
                        <div className="col-6 col-lg-9 col-md-8 col-sm-7">
                            <textarea type="textarea" className=" form-control col-11" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter comment here" />
                        </div>

                        <button className="btn btn-info col-5 col-lg-2 col-md-3 col-sm-4 " type="submit">Add comment</button>
                    </form>
                    <div className="border p-4">
                        <h4>Comments</h4>

                        {this.state.comments.map(comment => {
                            return (
                                <div className="border p-3 m-3">
                                    <div className="row">
                                        <div className="col-10">
                                            <h6 className="text-secondary">{comment.user.name}</h6>
                                            <h5 className="">
                                                {comment.description}
                                            </h5>

                                            <h6 clasName="text-secondary text-end">
                                                {String(comment.created_at).substring(0, 10)}
                                            </h6>
                                        </div>
                                        <div className="col-2">
                                            {comment.user._id == this.state.userId ? (
                                                <>
                                                    <button className="btn btn-danger" onClick={(e) => this.deleteComment(e, comment._id)}>Delete</button>
                                                </>
                                            ) : <></>}
                                        </div>

                                    </div>



                                </div>


                            )
                        })}
                    </div>

                    
                </div>

            </div>
        )
    }
}

export default withRouter(Comment)
