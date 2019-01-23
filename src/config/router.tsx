import * as React from 'react';
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {PathConfig} from './pathconfig';
import {RouterTest, Home, Store} from '../page/';

function checkAuth(nextState, replace) {
};

const router = (
    <Router history={hashHistory}>
        <Route path={PathConfig.RouterTest} onEnter={checkAuth} component={RouterTest}>
            <IndexRoute component={Home}/>
            <Route path={PathConfig.Home} component={Home}/>
        </Route>
    </Router>
);

export default router;
