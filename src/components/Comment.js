import React, { Component } from 'react';
import './Comment.css';
import Page from './PageIndicator';

class Comment extends Component {
    state = {
        value: '',
        list: [],
        page: {
            current: 1,
            length: 1,
            count: 10,
        }
    }
    componentDidMount = () => {
        this.readComments();
    }
    createComment = () => {
        const token = sessionStorage.getItem('token');        
        const body = {
            id: this.props.id,
            value: this.state.value
        }
        this.setState({value: ''});
        fetch(`${this.props.baseURL}/comments`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.readComments();
            } else throw json;
        })
        .catch(console.error)
    }
    readComments = () => {
        const offset = (this.state.page.current-1)*this.state.page.count;
        const limit = this.state.page.count;
            
        fetch(`${this.props.baseURL}/comments?offset=${offset}&limit=${limit}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {                
                this.setState({
                    list: json.data.comments,
                    page: {
                        ...this.state.page,
                        length: Math.floor(json.data.count/this.state.page.count) + 1
                    }
                })
            } else throw json;
        })
        .catch(console.error)
    }
    handleComment = (e) => {
        this.setState({value: e.target.value})
    }
    handlePage = (value) => {
        this.setState({
            page: {
                ...this.state.page,
                current: value
            }
        }, this.readComments)
    }
    render() {        
        return(
            <div id='comment-form'>
                <div id='comment-input'>
                    <input placeholder='댓글을 입력해주세요' value={this.state.value} onChange={this.handleComment} />
                    <div onClick={this.createComment}>입력</div>
                </div>
                <div id='comment-list'>
                    {this.state.list && this.state.list.map((comment, index) => {
                        return (<div key={index} id={comment.id}>
                            <div>
                                <div>{comment.name}</div>
                                <div>{comment.update_date}</div>
                            </div>
                            <div className='comment-value'>
                                <div >{comment.value}</div>
                            </div>
                        </div>);
                    })}
                </div>
                <Page
                    pages = {this.state.page.length}
                    value = {this.state.page.current}
                    onChange = {this.handlePage}
                />
            </div>
        );
    }
}
export default Comment;