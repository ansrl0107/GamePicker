import React, { Component } from 'react';
import './Header.css';
import Search from '../components/Search';
import LoginBtn from '../components/LoginBtn';

class Header extends Component {
    render() {
        console.log(this.props);
        
        return (
            <header id='main-header'>
                <Search></Search>
                <LoginBtn ></LoginBtn>
            </header>
        )
    }
}
export default Header;