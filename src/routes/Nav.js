import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

class Menu extends Component {
    render() {      
        return (
            <nav>
                <Link to='/' className='icon' id='home'></Link>
                <Link to='/talks' className='icon' id='talks'></Link>
                <Link to='/games/all' className='icon' id='games'></Link>
            </nav>
        )
    }
}
export default Menu;