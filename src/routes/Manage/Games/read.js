import React, { Component } from 'react';
import api from '../../../config/api';
import Select from 'react-select';

class Read extends Component {
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
        }
    }
    componentDidMount = () => {
        this.loadGame();
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
    handleInput = (e) => {
        this.setState({
            game: {
                ...this.state.game,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        const { title, developer, publisher, age_rate, summary, img_link, video_link, tags, platforms } = this.state.game;
        return (
            <React.Fragment>
                <header>
                    <div className='title'>게임 조회</div>
                </header>
                <section>
                    <div className='container'>
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
                            isClearable={true}
                            isMulti={true}
                        />
                        <div className='index'>플랫폼</div>
                        <Select 
                            value={platforms.map(platform => {return {label: platform, value: platform}})}
                            isMulti={true}
                        />
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
export default Read;