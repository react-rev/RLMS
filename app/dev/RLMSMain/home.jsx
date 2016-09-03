import React from 'react'
import NavLink from './NavLink.jsx'
export default class Home extends React.Component{
    render() {
        const left = {
            paddingTop: '0px',
            position: 'fixed',
            textAlign: 'center',
            float: 'left',
            width: '15%',
            height: '1080px',
        };
        const right = {
            marginTop: '90px',
            float: 'right',
            width: '75%',
            paddingBottom: '40px'

        };
        const containerFix = {
            marginTop: '-20px'
        }
        const nav = {
            paddingTop: '90px',
            paddingLeft: '0px',
            listStyleType: 'none'

        }
        return (
            ///////////////////////////////////////
            //for new routes
            //<NavLink to="/newRouteRef" className="list-group-item">Button Text</NavLink>
            //add to the list below
            ////////////////////////////////////////
            <div className="container" style={containerFix}>
                <div style={left} className="well">
                    <div role="nav" className="list-group" style={nav}>

                        <NavLink to="/home/Forum" className="list-group-item">Forum</NavLink>
                        <br/>
                        <NavLink to="/home/exam" className="list-group-item">Exam</NavLink>
                        <br/>
                        <NavLink to="/home/profile" className="list-group-item">Profile</NavLink>
                        <br/>
                        <NavLink to="/home/curriculum" className="list-group-item">Syllabus</NavLink>
                        <NavLink to="/home/admin" className="list-group-item">Admin - Batch</NavLink>
                        <br/>
                        <br/>
                        <br/>
                        <br/>   <br/>

                        <br/>
                        <br/>
                        <NavLink to="/logout" className="list-group-item">Logout</NavLink>
                    </div>
                </div>
                <div style={right} className="well">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
