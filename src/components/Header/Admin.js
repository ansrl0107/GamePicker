import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
    render() {
        return (
            <nav id='sub-menu'>
                <header>
                    
                </header>
                <div id='sub-menu-list' className='list'>
                    <Link to='/admin/games' className='item'>Games</Link>
                    <Link to='/admin/Users' className='item'>Users</Link>
                    <Link to='/admin/Tags' className='item'>Tags</Link>
                    <Link to='/admin/Platforms' className='item'>Platforms</Link>
                </div>
                <div id='login'>
                    
                </div>
            </nav> 
        )
    }
}
export default Admin;