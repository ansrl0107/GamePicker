import React, { Component } from 'react';
import api from '../config/api';
import './Login.css';
import Alert from '../components/Alert';

class Login extends Component {
    state = {
        email: '',
        password: '',
        alert: undefined
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    login = () => {
        fetch(`${api.host}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                sessionStorage.setItem('token',json.data);
                this.props.history.goBack();
            } else throw json.data;
        }).catch(err => {
            this.setState({
                alert: err
            })
        })
    }
    handleAlert = (boolean) => {
        this.setState({
            alert: undefined
        })
    }
    render() {
        const { email, password } = this.state;
        return (
            <section id='login'>
                {this.state.alert && <Alert handler={this.handleAlert} title='로그인 실패!' content={this.state.alert}/>}
                <div id='login-form' className='list'>
                    <input placeholder='이메일을 입력해주세요' name='email' onChange={this.handleInput} value={email}></input>
                    <input placeholder='비밀번호를 입력해주세요' type='password' name='password' onChange={this.handleInput} value={password}></input>
                    <div className='button fill' onClick={this.login}>로그인</div>
                </div>
            </section>
        )
    }
}
export default Login;