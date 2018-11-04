import React, { Component } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';


class Talks extends Component {
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
                json.data.games.unshift({
                    id: 0,
                    title: '전체'
                })
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
        const { search } = this.state;
        return (
            <nav id='sub-menu'>
                <header id='sub-menu-search'>
                    <input placeholder="Search..." id='search' value={this.state.search} onChange={this.handleSearch}/>
                </header>
                <div className='list'>
                    {this.state.games.map((game, index) => {
                        if (search !== '') {
                            if (game.title.includes(search)) {
                                return (<Link to={`/talks?id=${game.id}`} key={`game-key-${index}`} className='item'>{game.title}</Link>)
                            } else {
                                return null;
                            }
                        } else {
                            return (<Link to={`/talks?id=${game.id}`} key={`game-key-${index}`} className='item'>{game.title}</Link>)
                        }
                    })}
                </div>
            </nav> 
        )
    }
}
export default Talks;