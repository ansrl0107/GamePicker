import React, { Component } from 'react';
import api from '../../config/api'
import './Read.css';
import Comment from '../../components/Comment';

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
        const { post } = this.state;        
        return (
            <section id='post-read'>
                <section className='container'>
                    <header>
                        <h1>{post.title}</h1>
                        <div id='post-meta'>
                            <div>조회수 {post.views}</div>
                            <div>수정일 {post.update_date}</div>
                            <div>추천수 {post.recommend}</div>
                        </div>
                    </header>
                    <article>{post.content}</article>
                </section>
                <section className='container'>
                    <Comment baseURL={`${api.host}/posts/${this.props.match.params.id}`}></Comment>
                </section>
            </section>
        )
    }
}
export default Read;