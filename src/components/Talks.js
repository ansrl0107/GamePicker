import React, { Component } from 'react';
import api from '../config/api';
import { Link } from 'react-router-dom';


class Talks extends Component {
    state = {
        id: 0,
        refresh: false,
        posts: [],
        search: ''
    }
    componentDidMount = () => {
        this.loadPosts();
    }
    componentDidUpdate = () => {
        if (this.state.refresh) {
            this.setState({
                refresh: false
            }, this.loadPosts)
        }
    }
    static getDerivedStateFromProps = (nextProps, prevState) => {
        const id = new URLSearchParams(nextProps.location.search).get('id');
        if (id !== prevState.id) {
            return {
                refresh: true,
                id: id
            }
        }
        return null;
    }
    handleSearch = (e) => {        
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }
    loadPosts = () => {
        const id = Number(this.state.id);
        fetch(`${api.host}/posts?gameID=${id===0?'':id}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {                
                this.setState({
                    posts: json.data.posts
                })
            } else throw json.data;
        })
    }
    render() {
        const { search, posts } = this.state;
        return (
            <section>
                <header>

                </header>
                <div className='list'>
                    <input id='search' placeholder='게임을 검색해보세요' value={search} onChange={this.handleSearch}></input>
                    <div>
                    {posts.map((post, index) => {
                        if (post.title.toLowerCase().includes(search)) {
                            return (<div key={index} className='item post'>
                                <div>
                                    <Link to={`/talks/${post.id}/read`}><b>{post.title}</b> [{post.comment_count}]</Link>
                                </div>
                                <div>
                                    <div>{post.category}</div>
                                    <div>{post.name}</div>
                                    <div>{post.update_date}</div>
                                </div>
                            </div>)
                        } else {
                            return null;
                        }
                    })}
                    </div>
                </div>
            </section>
        )
    }
}
export default Talks;