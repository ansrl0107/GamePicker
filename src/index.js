import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './routes/Nav';
import Header from './routes/Header';

import GamesAll from './routes/Games/All';

import ManageGames from './routes/Manage/Games'
import ManageGamesRead from './routes/Manage/Games/read'
import ManageGamesCreate from './routes/Manage/Games/create'
import ManageGamesUpdate from './routes/Manage/Games/update'

import Talks from './routes/Talks/All';
import TalksRead from './routes/Talks/Read';

import Home from './routes/Home';

import Login from './routes/Login'

ReactDOM.render(<React.Fragment>
    <Router>
        <React.Fragment>
            <Nav />
            <Header />
            <Switch>
                <Route path='/login' component={Login} />
                <Route exact path='/manage/games' component={ManageGames} />
                <Route path='/manage/games/create' component={ManageGamesCreate} />
                <Route path='/manage/games/:id/read' component={ManageGamesRead} />
                <Route path='/manage/games/:id/update' component={ManageGamesUpdate} />

                <Route exact path='/talks' component={Talks} />
                <Route path='/talks/:id/read' component={TalksRead} />

                <Route path='/games/all' component={GamesAll} />
                
                <Route exact path='/' component={Home} />
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
