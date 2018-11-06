import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavSection.css';

class NavSection extends Component {
    state = {
        click: false
    }
    handleClick = () => {
        this.setState({
            click: !this.state.click
        })
    }
    render() {
        const { label, list } = this.props;
        const { click } = this.state;        
        const fold = {
            maxHeight: click?'500px':'0px',
            opacity: click?'1':'0'
        }
        return (
            <section>
                <h5 onClick={this.handleClick}>{label}</h5>
                <ul style={fold}>
                {list.map((item, index) => {
                    return <li key={index}><Link to={item.link}>{item.label}</Link></li>
                })}
                </ul>
            </section>
        );
    }
}
export default NavSection;