import React, { Component } from 'react';
import './Search.css';
import Api from '../config/api';

class Search extends Component {
    state = {
        list: [],
        games: [],
        search: ''
    }
    componentDidMount = () => {
        this.loadGame();
    }
    handleInput = (e) => {
        const list = [];
        if (e.target.value !== '') {
            this.state.games.forEach(game => {
                if (game.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                    list.push({ image: game.img_link, text: game.title })
                }
            })
        }
        this.setState({
            list: list,
            search: e.target.value
        })
    }
    loadGame = () => {
        fetch(`${Api.host}/games`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                games: json.data.games
            })
        }).catch(console.error)
    }
    render() {
        const { list, search } = this.state;
        const listStyle = {
            display: search===''?'none':'block'
        }
        return (
            <div id='search'>
                <input placeholder='게임을 검색해보세요' value={search} onChange={this.handleInput}></input>
                <div id='search-value' style={listStyle}>
                    {list.length === 0&& <div>
                        <p>검색결과가 없습니다..</p>
                    </div>}
                    {list.map((item, index) => {
                        if (item.image) {
                            return (<div key={index}>
                                <img src={item.image} alt='item'></img>
                                <p>{item.text}</p>
                            </div>)
                        } else {
                            return (<div key={index}>
                                <p>{item.text}</p>
                            </div>)
                        }
                    })}
                </div>
            </div>
        )
    }
}
export default Search;