import React, { Component } from 'react';
import api from '../config/api';
import './LoginBtn.css'

class LoginBtn extends Component {
    state = {
        login: false,
        dropdown: false,
        data: {}
    }
    componentDidMount = () => {
        this.checkLogin();
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
    checkLogin = () => {
        const token = sessionStorage.getItem('token');        
        if (token) {            
            this.setState({
                login: true
            })
            fetch(`${api.host}/me`, {
                headers: {
                    'x-access-token': token
                }
            }).then(res => res.json())
            .then(json => {
                this.setState({
                    data: json.data
                })
            })
        }
    }
    logout = () => {
        sessionStorage.removeItem('token');
        this.checkLogin();
        this.setState({
            login: false,
            dropdown: false
        })
    }
    render() {                        
        const { name, email } = this.state.data;
        const style = {
            backgroundColor: this.state.login?'blue':'red'
        }
        return (
            <div id='login-btn'>
                <div className='status' onClick={this.handleClick} style={style}></div>
                {this.state.dropdown && <div className='dropdown'>
                    <div>
                        <div>{name}</div>
                        <div>{email}</div>
                    </div>
                    <ul>
                        <li>내정보</li>
                        <li onClick={this.logout}>로그아웃</li>
                    </ul>
                </div>}
            </div>
        )
    }
}
export default LoginBtn;