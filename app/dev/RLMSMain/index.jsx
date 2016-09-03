import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App.jsx'
import User from './digest.jsx'
import Home from './home.jsx'

import Profile from '../RLMSUser/profile.jsx';

import Forum from '../RLMSForum/Components/Blog.jsx'

import Login from '../RLMSLogin/RLMSLogin.jsx'
import Signup from '../RLMSLogin/RLMSSignup.jsx';
import Exam from '../RLMSExam/examComponent.jsx';
import Admin from '../RLMSAdmin/RLMSBatch.jsx';

import Curriculum from '../RLMSCurriculum/index.jsx'


render((
    //////////////////////////////
    //for new route
    //<Route path = "name of reference" component = {name of import of component}/>
    //add to list below
    //////////////////////////////
    //for a call from function initialize
    //contextTypes: {
    //router: React.PropTypes.object.isRequired
    //},
    //and then in the function call
    //function example
    //test : function(){
    //this.context.router.push('/#/home');
    //},
    //////////////////////////////
    //onClick={test}
    ////////////////////////////////
    <Router history = {hashHistory}>
        <Route path="/" component = {App}>
            <IndexRoute component = {Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/signUp" component={Signup}/>
            <Route path="/home" component={Home}>
                <Route path="/home/admin" component={Admin}/>
                <Route path="/home/curriculum" component={Curriculum}/>
                <Route path="/home/exam" component={Exam}/>
                <Route path="/home/forum" component={Forum}/>
                <Route path="/home/forum" component={Home}/>
                <Route path="/home/profile" component={Profile}/>
            </Route>
            <Route path="/logout" component={Login}/>
        </Route>
    </Router>
),document.getElementById('app'))
