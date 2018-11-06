import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api';
import Alert from '../../components/Alert';
import LoginBtn from '../../components/LoginBtn';

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
            <section id='admin-games'>
                {deleteAlert && <Alert 
                    handler={this.handleAlert}
                    title='게임 삭제'
                    content={`'${this.state.games.filter(game => game.id === this.state.deleteId)[0].title}' 을(를) 삭제하시겠습니까?`}
                    text='삭제'
                />}
                <header>
                    <input id='search' placeholder='게임을 검색해보세요' value={search} onChange={this.handleSearch}></input>
                    <Link to={'/manage/games/create'} className='button'>추가</Link>
                    <LoginBtn history={this.props.history}/>
                </header>
                <div className='list'>
                    <div className='container'>
                    {games && games.map((game, index) => {
                        if (game.title.toLowerCase().includes(search)) {
                            return (<div key={index} className='item'>
                                <Link to={`/manage/games/${game.id}/read`} className='title'>{game.title}</Link>
                                <div className='buttons'>
                                    <Link to={`/manage/games/${game.id}/update`} className='button'>수정</Link>
                                    <div className='button' data-id={game.id} onClick={this.deleteAlert}>삭제</div>
                                </div>
                            </div>)
                        } else {
                            return null;
                        }   
                    })}
                    </div>
                </div>
            </section>
        )
    }
}
export default Games;