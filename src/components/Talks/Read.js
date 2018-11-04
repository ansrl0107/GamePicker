import React, { Component } from 'react';
import api from '../../config/api';
import Comment from '../Comment';
import './Read.css'

class Read extends Component {
    state = {
        id: undefined,
        refresh: false,
        post: {}
    }
    componentDidMount = () => {        
        this.loadPost();
    }
    componentDidUpdate = () => {
        if (this.state.refresh) {
            this.setState({
                refresh: false
            }, this.loadPost)
        }
    }
    static getDerivedStateFromProps = (nextProps, prevState) => {
        const id = nextProps.match.params.id;        
        if (id !== prevState.id) {
            return {
                refresh: true,
                id: id
            }
        }
        return null;
    }
    loadPost = () => {
        const id = this.props.match.params.id;                
        fetch(`${api.host}/posts/${Number(id)}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {                
                this.setState({
                    post: json.data
                })
            } else throw json.data;
        })
    }
    render() {
        const { post, id } = this.state;                
        return (
            <section>
                <header>{post.title}</header>
                <div className='list'>
                    <div id='post-content'>
                        {post.content}
                    </div>
                    <div id='comment'>
                    <Comment
                        baseURL={`${api.host}/posts/${id}`}
                    />
                    </div>
                </div>
            </section>
        )
    }
}
export default Read;