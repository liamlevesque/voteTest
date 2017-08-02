import React from 'react';
import { Route, Link } from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

const MainLayout = ({component:Component, ...props}) => 
    <Route {...props} render={ (props) => 
        <div className="main-layout">
            <header>
                <h1><Link to="/">Voting</Link></h1>
                <LoginButtons />
                <nav>
                    <Link to="/about">About</Link>
                </nav>
            </header>
            <Component {...props}/>
        </div>
    }/>

export default MainLayout;

