import React, { Component } from 'react';
import api from '../../../config/api';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

class Update extends Component {
    state = {
        game: {
            title: '',
            developer: '',
            publisher: '',
            age_rate: '',
            summary: '',
            img_link: '',
            video_link: '',
            tags: [],
            platforms: []
        },
        tags: [],
        platforms: [],
        redirect: false
    }
    componentDidMount = () => {
        this.loadGame();
        this.loadTags();
        this.loadPlatforms();
    }
    loadGame = () => {
        const id = this.props.match.params.id;        
        fetch(`${api.host}/games/${id}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({
                    game: json.data
                })
            } else throw json.data;
        }).catch(console.error)
    }
    loadTags = () => {
        fetch(`${api.host}/tags`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({ tags: json.data })
            } else throw json.data;
        }).catch(console.error)
    }
    loadPlatforms = () => {
        fetch(`${api.host}/platforms`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({ platforms: json.data })
            } else throw json.data;
        }).catch(console.error);
    }
    updateGame = () => {
        const id = this.props.match.params.id;       
        const token = sessionStorage.getItem('token'); 
        fetch(`${api.host}/games/${id}`, {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state.game)
        }).then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({
                    redirect: true
                })
            } else throw json.data;
        }).catch(console.error);
    }
    handleInput = (e) => {
        this.setState({
            game: {
                ...this.state.game,
                [e.target.name]: e.target.value
            }
        })
    }
    handleTags = (list) => {
        this.setState({
            game: {
                ...this.state.game,
                tags: list.map(item => {return item.value})
            }
        })
    }
    handlePlatforms = (list) => {
        this.setState({
            game: {
                ...this.state.game,
                platforms: list.map(item => {return item.value})
            }
        })
    }
    render() {
        const allTags = this.state.tags.map(tag => {
            return {label: tag.value, value: tag.value}
        })
        const allPlatfroms = this.state.platforms.map(platform => {
            return {label: platform.value, value: platform.value}
        })
        const { title, developer, publisher, age_rate, summary, img_link, video_link, tags, platforms } = this.state.game;
        const select_style = {
            container: (base, state) => ({
                ...base,
                margin: '0 16px 16px 16px',
            }),
            valueContainer: (base, state) => ({
                ...base,
                padding: '6px',
            }),
            control: (base, state) => ({
                ...base,
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
            }),
            menu: (base, state) => ({
                ...base,
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)'
            }),
            multiValue: (base, state) => ({
                ...base,
                backgroundColor: 'rgba(0,0,0,0.2)',
            }),
            multiValueLabel: (base, state) => ({
                ...base,
                color: 'white'
            }),
            input: (base, state) => ({
                ...base,
                height: '28px'
            })
        }
        if (this.state.redirect) {
            return <Redirect to='/admin/games' />
        } else {
            return (
                <section>
                    <header>
                        게임 수정
                        <div className='button' onClick={this.updateGame}>확인</div>
                    </header>
                    <div className='list'>
                        <div className='index'>제목</div>
                        <input placeholder='제목을 입력해주세요' name='title' value={title} onChange={this.handleInput}></input>
                        <div className='index'>개발</div>
                        <input placeholder='개발사을 입력해주세요' name='developer' value={developer} onChange={this.handleInput}></input>
                        <div className='index'>배포</div>
                        <input placeholder='배포사을 입력해주세요' name='publisher' value={publisher} onChange={this.handleInput}></input>
                        <div className='index'>이용등급</div>
                        <input placeholder='이용등급을 입력해주세요' name='age_rate' value={age_rate} onChange={this.handleInput}></input>
                        <div className='index'>요약</div>
                        <textarea placeholder='요약을 입력해주세요' name='summary' value={summary} onChange={this.handleInput}></textarea>
                        <div className='index'>이미지 링크</div>
                        <input placeholder='이미지 링크를 입력해주세요' name='img_link' value={img_link} onChange={this.handleInput}></input>
                        <div className='index'>영상 링크</div>
                        <input placeholder='비디오 링크를 입력해주세요' name='video_link' value={video_link} onChange={this.handleInput}></input>
                        <div className='index'>태그</div>
                        <Select 
                            value={tags.map(tag => {return {label: tag, value: tag}})}
                            options={allTags}
                            isClearable={true}
                            isMulti={true}
                            styles={select_style}
                            onChange={this.handleTags}
                        />
                        <div className='index'>플랫폼</div>
                        <Select 
                            value={platforms.map(platform => {return {label: platform, value: platform}})}
                            options={allPlatfroms}
                            isClearable={true}
                            isMulti={true}
                            styles={select_style}
                            onChange={this.handlePlatforms}
                        />
                    </div>
                </section>
            )
        }
    }
}
export default Update;