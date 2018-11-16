import React, { Component } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';
import './All.css';

class All extends Component {
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
        console.log(this.state.posts);
        const { posts } = this.state;
        
        return (
            <React.Fragment>
                <section id='main-section'>
                    <section className='container'>
                        <section id='post-tools'>
                            <div>
                                <div id='post-category'>Category</div>
                                <Link to='talks/create' id='post-create'></Link>
                            </div>
                            <div>
                                <div id='post-sort'>
                                    <div>인기</div>
                                    <div>최신</div>
                                    <div>추천</div>
                                </div>
                                <div id='post-search'>
                                    <select>
                                        <option>제목</option>
                                        <option>글쓴이</option>
                                    </select>
                                    <input placeholder='게시물을 검색해보세요'></input>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id='post-list'>
                            {posts.map((post, index) => {
                                return (<article key={index}>
                                    <div>
                                        <Link to={`/talks/${post.id}/read`}>{post.title}</Link>
                                        <div>[{post.comment_count}]</div>
                                    </div>
                                    <div>
                                        <div>{post.category}</div>
                                        <div>{post.name}</div>
                                        <div>{post.update_date}</div>
                                    </div>
                                </article>)
                            })}
                        </section>
                    </section>
                </section>
            </React.Fragment>
        );
    }
}
export default All;