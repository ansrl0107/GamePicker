import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api';
import Alert from '../../components/Alert';
import './Games.css'

class Games extends Component {
    state = {
        games: [],
        search: '',
        deleteAlert: false,
        delete: false,
        deleteId: undefined
    }
    componentDidMount = () => {
        this.loadGames();
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
        }).catch(console.error)
    }
    deleteGame = (e) => {
        if (this.state.delete) {
            const token = sessionStorage.getItem('token');
            fetch(`${api.host}/games/${this.state.deleteId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            }).then(res => res.json())
            .then(json => {
                if (json.status === 'success') {
                    this.loadGames()
                } else throw json.data;
            }).catch(console.error)
        }
    }
    deleteAlert = (e) => {
        this.setState({
            deleteAlert: true,
            deleteId: Number(e.target.dataset.id)
        })
    }
    handleAlert = (boolean) => {
        this.setState({
            delete: boolean,
            deleteAlert: false
        }, this.deleteGame)
    }
    handleSearch = (e) => {        
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }
    render() {        
        const { games,search, deleteAlert } = this.state;                           
        return (
            <React.Fragment>
                {deleteAlert && <Alert 
                    handler={this.handleAlert}
                    title='게임 삭제'
                    content={`'${this.state.games.filter(game => game.id === this.state.deleteId)[0].title}' 을(를) 삭제하시겠습니까?`}
                    text='삭제'
                />}
                <section id='manage-game'>
                    <section id='game-list' className='list'>
                    {games && games.map((game, index) => {
                        if (game.title.toLowerCase().includes(search)) {
                            return (<article key={index} className='item'>
                                <Link to={`/manage/games/${game.id}/read`} className='title'>{game.title}</Link>
                                <div className='buttons'>
                                    <Link to={`/manage/games/${game.id}/update`} className='textbutton'>수정</Link>
                                    <div className='textbutton' data-id={game.id} onClick={this.deleteAlert}>삭제</div>
                                </div>
                            </article>)
                        } else {
                            return null;
                        }   
                    })}
                    </section>
                    <section id='game-create'>
                        <Link to='/manage/games/create' className='button fill'>게임 추가</Link>
                    </section>
                </section>
            </React.Fragment>
        )
    }
}
export default Games;