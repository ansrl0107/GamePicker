import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './routes/Nav';

import ManageGames from './routes/Manage/Games'

import Login from './routes/Login'

ReactDOM.render(<React.Fragment>
    <Router>
        <React.Fragment>
            <Nav />
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/manage/games' component={ManageGames} />
                {/*
                <Route path='/games/recommend' component={} />
                <Route path='/games/explore' component={} />
                <Route path='/talks' component={} />
                <Route path='/talks/read' component={} />
                <Route path='/talks/write' component={} />
                */}
            </Switch>
        </React.Fragment>
    </Router>
</React.Fragment>, document.getElementById('root'));
