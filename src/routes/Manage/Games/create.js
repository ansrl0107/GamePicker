import React, { Component } from 'react';
import api from '../../../config/api';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

class Create extends Component {
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
        this.loadTags();
        this.loadPlatforms();
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
    createGame = () => {        
        const token = sessionStorage.getItem('token');
        fetch(`${api.host}/games`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.game)
        }).then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({ redirect: true })
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
    handleAge = (item) => {        
        this.setState({
            game: {
                ...this.state.game,
                age_rate: item.value
            }
        })
        
    }
    render() {
        const age = ['전체이용가','12세 이용가','15세 이용가', '청소년이용불가', '심의등급없음'];
        const { title, developer, publisher, summary, img_link, video_link, tags, platforms } = this.state.game;
        const allTags = this.state.tags.map(tag => {
            return {label: tag.value, value: tag.value}
        })
        
        const allPlatfroms = this.state.platforms.map(platform => {
            return {label: platform.value, value: platform.value}
        })
        if (this.state.redirect) {
            return <Redirect to='/manage/games'/>
        } else {
            return (
                <React.Fragment>
                    <section>
                        <div className='container'>
                            <div className='index'>제목</div>
                            <input placeholder='제목을 입력해주세요' name='title' value={title} onChange={this.handleInput}></input>
                            <div className='index'>개발</div>
                            <input placeholder='개발사을 입력해주세요' name='developer' value={developer} onChange={this.handleInput}></input>
                            <div className='index'>배포</div>
                            <input placeholder='배포사을 입력해주세요' name='publisher' value={publisher} onChange={this.handleInput}></input>
                            <div className='index'>이용등급</div>
                            <Select
                                options={age.map(a => {return {label: a, value: a}})}
                                isClearable
                                onChange={this.handleAge}
                            />
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
                                onChange={this.handleTags}
                            />
                            <div className='index'>플랫폼</div>
                            <Select 
                                value={platforms.map(platform => {return {label: platform, value: platform}})}
                                options={allPlatfroms}
                                isClearable={true}
                                isMulti={true}
                                onChange={this.handlePlatforms}
                            />
                            <div className='button fill'>추가</div>
                        </div>
                    </section>
                </React.Fragment>
            )
        }
    }
}
export default Create;