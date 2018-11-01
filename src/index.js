import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';

import GamesMenu from './components/Header/Games';
import TalksMenu from './components/Header/Talks';
import AdminMenu from './components/Header/Admin';

import AdminGames from './components/Admin/Games';
import AdminGamesRead from './components/Admin/Games/read';
import AdminGamesUpdate from './components/Admin/Games/update';
import AdminGamesCreate from './components/Admin/Games/create';

import Games from './components/Games';
import Talks from './components/Talks';
import ReadTalks from './components/Talks/Read';

ReactDOM.render(<React.Fragment>
    <Router>
        <React.Fragment>
            <Header />
            <Switch>
                <Route path='/games' component={GamesMenu} />
                <Route path='/talks' component={TalksMenu} />
                <Route path='/admin' component={AdminMenu} />
            </Switch>
            
            <Switch>
                <Route path='/games/:id' component={Games} />
                <Route exact path='/admin/games' component={AdminGames} />
                <Route path='/admin/games/:id/read' component={AdminGamesRead} />
                <Route path='/admin/games/:id/update' component={AdminGamesUpdate} />
                <Route path='/admin/games/create' component={AdminGamesCreate} />
                <Route exact path='/talks' component={Talks} />
                <Route path='/talks/:id/read' component={ReadTalks} />
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
