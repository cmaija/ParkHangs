import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import MapIcon from '../assets/icons/map-icon.svg'
import CalendarIcon from '../assets/icons/calendar-icon.svg'
//import { connect } from 'react-redux';
//import {increment} from '../actions';

class NavBar extends React.Component {
    render () {
        return (
            <nav className="NavBar">
                <span className="NavTitle">PARK HANGS</span>
                <ul id="NavList" className="NavList">
                    <li className="NavLink">
                        <Link to="/">
                            <img src={MapIcon} alt="Map Icon" />
                        </Link></li>
                    <li className="NavLink">
                        <Link to="/park-events">
                            <img src={CalendarIcon} alt="Calendar Icon" />
                        </Link>
                    </li>
                </ul>
            </nav>

        );
    }
}

export default NavBar;
