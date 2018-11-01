import React, { Component } from 'react';
import './Games.css';
import api from '../config/api';
import Youtube from 'react-youtube';

class Games extends Component {
    state = {
        id: 1,
        game: {},
        refresh: false
    }
    componentDidMount = () => {
        this.loadGame();
    }
    componentDidUpdate = () => {
        if (this.state.refresh) {
            this.setState({
                refresh: false
            }, this.loadGame)
        }
    }
    loadGame = () => {
        fetch(`${api.host}/games/${this.state.id}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {    
                this.setState({
                    game: json.data
                })
            } else throw json.data;
        }).catch(console.error)
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const id = nextProps.match.params.id        
        if (id !== prevState.id) {
            return {
                refresh: true,
                id: id
            }
        }
        return null;
    }
    render() {
        const { title, img_link, video_link, tags, platforms, summary, publisher, developer } = this.state.game;        
        return (
            <section id='games'>
                <header>
                    {title}
                </header>
                <div className='list'>
                    <div id='game-image'>
                        <div>
                            <img src={img_link} alt='game'/>
                        </div>
                    </div>
                    <div id='game-video'>
                        <div>
                        {video_link &&  <Youtube videoId={video_link.split('/')[3]} opts={{width: '100%', height: '100%'}}/>}
                        </div>
                    </div>
                    <div id='game-publisher'>배포: {publisher}</div>
                    <div id='game-developer'>개발: {developer}</div>
                    <div id='game-summary'>{summary}</div>
                    <div id='game-tags'>
                        {tags && tags.map((tag, index) => {
                            return (<div key={`tag${index}`}>#{tag}</div>)
                        })}
                    </div>
                    <div id='game-platforms'>
                        {platforms && platforms.map((platform, index) => {
                            return (<div key={`platform${index}`}>{platform}</div>)
                        })}
                    </div>
                </div>
            </section>
        )
    }
}
export default Games;