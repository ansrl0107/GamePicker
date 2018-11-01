import React, { Component } from 'react';
import './Header.css'
import api from '../config/api';
import { Link } from 'react-router-dom'

class Header extends Component {
    state = {
        menu: 'games',
        games: [],
        alert: true
    }
    loadGames = () => {
        fetch(`${api.host}/games`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({
                    games: json.data.games
                })
            } else throw json.data;
        }).catch(console.error);        
    }
    render() {
        return (
            <header>
                <div id='menu'>
                    <Link to ='/games'>games</Link>
                    <Link to ='/talks'>talks</Link>
                    <Link to ='/admin'>admin</Link>
                </div>
            </header>
        );
    }
}
export default Header;