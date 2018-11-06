import React, { Component } from 'react';
import Section from '../components/NavSection';
import { Link } from 'react-router-dom';
import './Nav.css'

class Menu extends Component {
    render() {
        const menu = [
            {
                label: 'GAMES',
                detail: [
                    { label: 'All', link: '/games/all' },
                    { label: 'Recommend', link: '/games/recommend' }
                ]
            },
            {
                label: 'TALKS',
                detail: [
                    { label: 'All', link: '/talks'}
                ]
            },
            {
                label: 'MANAGE',
                detail: [
                    { label: 'games', link: '/manage/games' },
                    { label: 'users', link: '/manage/users' },
                    { label: 'tags', link: '/manage/tags' },
                    { label: 'platforms', link: '/manage/platforms' }
                ]
            }
        ]        
        return (
            <nav>
                <div id='home'><Link to='/'>GamePicker</Link></div>
                {menu.map((m, idx) => {
                    return (
                        <Section 
                            key={idx}
                            label={m.label}
                            list={m.detail}
                        />
                    );
                })}
            </nav>
        )
    }
}
export default Menu;