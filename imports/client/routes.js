import React from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';
import { render } from 'react-dom';

import App from './App';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';

Meteor.startup( () => {
    render(
        <BrowserRouter history={browserHistory}>
            <div>
                <MainLayout exact path='/' component={App}/>
                <MainLayout path="/about" component={About}/>
                <MainLayout path="/items/:id" component={App}/>
            </div>
        </BrowserRouter>,
        document.getElementById('render-target')
    ); 
});
