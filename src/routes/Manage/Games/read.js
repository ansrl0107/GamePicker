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
                <section>
                    <div className='container'>
                        <div className='index'>제목</div>
                        <input placeholder='제목을 입력해주세요' name='title' value={title}></input>
                        <div className='index'>개발</div>
                        <input placeholder='개발사을 입력해주세요' name='developer' value={developer}></input>
                        <div className='index'>배포</div>
                        <input placeholder='배포사을 입력해주세요' name='publisher' value={publisher}></input>
                        <div className='index'>이용등급</div>
                        <input placeholder='이용등급을 입력해주세요' name='age_rate' value={age_rate}></input>
                        <div className='index'>요약</div>
                        <textarea placeholder='요약을 입력해주세요' name='summary' value={summary}></textarea>
                        <div className='index'>이미지 링크</div>
                        <input placeholder='이미지 링크를 입력해주세요' name='img_link' value={img_link}></input>
                        <div className='index'>영상 링크</div>
                        <input placeholder='비디오 링크를 입력해주세요' name='video_link' value={video_link}></input>
                        <div className='index'>태그</div>
                        <Select 
                            value={tags.map(tag => {return {label: tag, value: tag}})}
                            isMulti={true}
                            isDisabled
                        />
                        <div className='index'>플랫폼</div>
                        <Select 
                            value={platforms.map(platform => {return {label: platform, value: platform}})}
                            isMulti={true}
                            isDisabled
                        />
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
export default Read;