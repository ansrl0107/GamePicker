import React, { Component } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';
import './All.css';

class GamesAll extends Component {
    state = {
        search: '',
        games: []
    }
    handleSearch = (e) => {        
        this.setState({
            search: e.target.value.toLowerCase()
        })
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
    render() {
        const { search, games } = this.state;        
        return (
            <React.Fragment>
                <section id='game'>
                    <div className='container'>
                        {games.map((game, index) => {
                            if (game.title.toLowerCase().includes(search)) {
                                return (<Link to={`/games/${game.id}/info`} className='item' key={index}>
                                    <div className='img' style={{backgroundImage: `url(${game.img_link})`}} />
                                    <div className='meta'>
                                        <div className='title'>{game.title}</div>
                                        <div className='rate'>{game.rate}</div>
                                    </div>
                                </Link>)
                            } else {
                                return null;
                            }   
                        })}
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
export default GamesAll;