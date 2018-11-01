import React, { Component } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';

class Games extends Component {
    state = {
        games: [],
        search: ''
    }
    componentDidMount = () => {
        this.loadGames();
    }
    loadGames = () => {
        fetch(`${api.host}/games?sort=random`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({
                    games: json.data.games
                })
            } else throw json.data;
        }).catch(console.error);        
    }
    handleSearch = (e) => {        
        this.setState({
            search: e.target.value
        })
    }
    render() {
        return (
            <nav>
                <header>
                    <input placeholder="Search..." id='search' value={this.state.search} onChange={this.handleSearch}/>
                </header>
                <div className='list'>
                    {this.state.games.map((game, index) => {
                        if (this.state.search !== '') {
                            if (game.title.includes(this.state.search)) {
                                return (<Link to={`/games/${game.id}`} key={`game-key-${index}`} className='item'>{game.title}</Link>)
                            } else {
                                return null;
                            }
                        } else {
                            return (<Link to={`/games/${game.id}`} key={`game-key-${index}`} className='item'>{game.title}</Link>)
                        }
                    })}
                </div>
                <div id='login'>
                    
                </div>
            </nav> 
        )
    }
}
export default Games;