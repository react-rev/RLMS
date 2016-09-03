import React from 'react'
import { render } from 'react-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import NavLink from './NavLink.jsx'
import User from './digest.jsx';

export default class Header extends React.Component{
    render(){
        var name = sessionStorage.getItem("username");
        var leftNav ={
            paddingTop: '28px'
        }
        var logo={
            height:'20px',
            width:'20px'
        };
        const userNav={
            color:"white",
            textDecoration :'none'
            
        }
        return (<Navbar inverse fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to="/home/forum">React LMS</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>)
    }
}