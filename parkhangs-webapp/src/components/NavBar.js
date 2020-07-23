import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import 'components/NavBar.css'
import MapIcon from 'assets/icons/map-icon.svg'
import CalendarIcon from 'assets/icons/calendar-icon.svg'
import UserIcon from 'assets/icons/user-icon.svg'
import GoogleUserAuthorization from "./GoogleUserAuthorization";

class NavBar extends React.Component {
    render() {
        return (
            <nav className="NavBar">
                <Link className="NavTitle" to="/">
                    <span className="NavTitle">PARK HANGS</span>
                </Link>
                <ul id="NavList" className="NavList">
                    <li className="NavLink">
                        <Link to="/">
                            <img src={MapIcon} alt="Map Icon"/>
                        </Link></li>
                    <li className="NavLink">
                        <Link to="/park-events">
                            <img src={CalendarIcon} alt="Calendar Icon"/>
                        </Link>
                    </li>
                    <li className="NavLink">
                        <Link to="/user">
                            <img src={UserIcon} alt="User Icon"/>
                        </Link>
                    </li>

                    {
                        this.props.user !== null ?
                            <span>Welcome, {this.props.user.username}</span>
                            :
                            null

                    }

                    <li className="NavLink">
                        <GoogleUserAuthorization/>
                    </li>
                </ul>
            </nav>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps, null)(NavBar);
