import React from 'react';
//import { connect } from 'react-redux';
//import {increment} from '../actions';

class NavBar extends React.Component {
    render() {
        return (
            <div className>
                <nav id="NavBar">
                    <ul id="NavList">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Maps</a></li>
                        <li><a href="#">Calender</a></li>
                    </ul>
                </nav>
            </div>

        );
    }
}

export default NavBar;