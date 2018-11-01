import React, { Component } from 'react';
import './Alert.css';

class Alert extends Component {
    static defaultProps = {
        title: 'title',
        content: 'content',
        text: '확인'
    }
    cancel = () => {
        this.props.handler(false);
    }
    ok = () => {
        this.props.handler(true);
    }
    render() {
        const { title, content, text } = this.props;
        return (
            <div id='Alert'>
                <div id='Alert-box'>
                    <div>
                        <div id='Alert-title'>{title}</div>
                        <div id='Alert-content'>{content}</div>
                    </div>
                    <div>
                        <div>
                            <div onClick={this.cancel}>취소</div>
                            <div onClick={this.ok}>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Alert;