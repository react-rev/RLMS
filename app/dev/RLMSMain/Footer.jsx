import React from 'react';
import {render} from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Footer extends React.Component{
    render (){
        return (<Navbar fixedBottom>
            <Navbar.Text>
                Copyright © 2016 RLMS
            </Navbar.Text>
        </Navbar>)
    }
}

export default Footer;
