import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <section id='main-section'>
                    <section id='slide'>
                        slide
                    </section>
                    <section className='container'>
                        <header>section 2</header>
                    </section>
                </section>
            </React.Fragment>
        )
    }
}
export default Home;