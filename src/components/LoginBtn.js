import React, { Component } from 'react';
import api from '../config/api';
import './LoginBtn.css'

class LoginBtn extends Component {
    state = {
        login: false,
        dropdown: false
    }
    componentDidMount = () => {
        this.status();
    }
    loadMe = () => {
        const token = sessionStorage.getItem('token');
        fetch(`${api.host}/me`, {
            headers: {
                'x-access-token': token
            }
        }).then(res => res.json())
        .then(json => {

        })
    }
    handleClick = () => {
        if (this.state.login) {
            this.setState({
                dropdown: !this.state.dropdown
            })
        } else {
            this.props.history.push('/login');
        }
    }
    status = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({
                login: true
            })
        }
    }
    render() {                
        return (
            <div id='login-btn'>
                <div className='status' onClick={this.handleClick}></div>
                {this.state.dropdown && <div className='dropdown'>
                    <div>name</div>
                    <div>내정보</div>
                    <div>로그아웃</div>
                </div>}
            </div>
        )
    }
}
export default LoginBtn;