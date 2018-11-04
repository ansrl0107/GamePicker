import React, { Component } from 'react';
import './PageIndicator.css';

class PageIndicator extends Component {
    handleClick = (e) => {
        this.props.onChange(e.target.innerText);
    }
    render() {        
        return (
            <div className='page-indicator'>
                {(Array.from(Array(this.props.pages).keys())).map((value, index) => {                                        
                    return (<div
                        key={index}
                        onClick={this.handleClick}
                        style={{backgroundColor: Number(this.props.value)===Number(value)+Number(1)?'#212325':'#35393E'}}
                    >{value+1}</div>);
                })}
            </div>
        );
    }
}
export default PageIndicator;