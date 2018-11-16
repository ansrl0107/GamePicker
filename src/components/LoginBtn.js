import React, { Component } from 'react';
import api from '../config/api';
import './LoginBtn.css'
import { withRouter } from 'react-router-dom';

class LoginBtn extends Component {
    state = {
        login: false,
        dropdown: false,
        data: {}
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
        const token = sessionStorage.getItem('token');        
        if (token) {            
            this.setState({
                dropdown: !this.state.dropdown
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
        } else {
            this.props.history.push('/login');
        }
    }
    logout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            data: undefined,
            dropdown: false
        })
    }
    render() {                        
        const { name, email } = this.state.data;
        const style = {
            //backgroundImage: `url('${'../resource/user.png'}')`
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
export default withRouter(LoginBtn);