import React from 'react'
import {connect} from 'react-redux'
import {openModal} from "../features/modal/modalSlice";
import "views/UserProfileView.css";
import {toggleSavedPark, toggleSavedEvent, getSavedParksInfo} from "../features/users/userSlice";
import {cloneDeep} from 'lodash'
import moment from 'moment'


class UserProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.editProfile = this.editProfile.bind(this);
        this.renderSavedParks = this.renderSavedParks.bind(this);
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.props.getSavedParks(this.props.user.email)
        }
    }

    editProfile = () => {
        const modalProps = {
            component: 'ModalUserEdit',
        };

        this.props.openModal(modalProps);

    };

    convertToMoment = (date) => {
        let eventDate = date
        if (typeof eventDate === "string") {
            eventDate = parseInt(eventDate, 10)
        }

        if (eventDate / 1000000000000 < 1) {
            eventDate *= 1000
        }

        eventDate = moment(eventDate)
        return eventDate
    }

    eventStartTime = (timestamp) => {
        const date = this.convertToMoment(timestamp)
        return timestamp ? date.format("MMMM Do YYYY hh:mma") : null
    }

    eventEndTime = (timestamp) => {
        if (timestamp != null) {
            const date = this.convertToMoment(timestamp)
            return timestamp ? date.format("hh:mma") : null
        } else {
            return null;
        }
    }

    savedParks = () => {
        const savedParks = this.props.savedParks

        if (savedParks.length === 0) {
            return <div> You do not have any saved parks!</div>;
        }

        return savedParks
    }

    savedEvents = () => {
        const savedEventIds = this.props.user.savedEvents || []
        let savedEvents = []

        savedEvents = savedEventIds.map((eventId) => {
            let storedEvent = cloneDeep(this.props.events.find(event => event._id === eventId))
            if (storedEvent) {
                const park = this.props.parks.find(park => park._id === storedEvent.parkId)
                storedEvent.parkName = park.name ? park.name : ''
                storedEvent.eventDateTime = this.eventStartTime(storedEvent.eventDateTime)
                storedEvent.eventEndDateTime = this.eventEndTime(storedEvent.eventEndDateTime)
            }

            return storedEvent
        })

        savedEvents = savedEvents.filter(event => event !== undefined)
        if (savedEvents.length === 0) {
            return <div> You do not have any saved events!</div>
        }
        return savedEvents
    }

    renderSavedParks() {
        const savedParks = this.savedParks()
        const savedEvents = this.savedEvents()

        return (
            <div>
                <h3 className="Favourite-Parks-Title">
                    Favourite Parks:
                </h3>
                {
                    savedParks.length ?
                        <table className="Favourite-Parks-Table">
                            <thead>
                            <tr>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Park name: </b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Average Rating:</b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Remove from Favourites</b>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                savedParks.map((park) =>
                                    <tr key={park._id}>
                                        <td>
                                            {park.name}
                                        </td>
                                        <td>
                                            {park.averageRating || 'This park has no ratings yet!'}
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                this.props.removeFavouritePark(this.props.user, park._id)
                                            }}>
                                                <b>X</b>
                                            </button>
                                        </td>
                                    </tr>)
                            }
                            </tbody>

                        </table>
                        : savedParks
                }
                <h3 className="Favourite-Parks-Title">
                    Favourite Events:
                </h3>
                {
                    savedEvents.length ?
                        <table className="Favourite-Parks-Table">
                            <thead>
                            <tr>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Park: </b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Event Start:</b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Event End:</b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Number of Favorites:</b>
                                </td>
                                <td className="Favourite-Parks-Table-Rows">
                                    <b>Remove from Favourites</b>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                savedEvents.map((event) =>
                                    <tr key={event._id}>
                                        <td>
                                            {event.parkName}
                                        </td>
                                        <td>
                                            {event.eventDateTime}
                                        </td>
                                        <td>
                                            {event.eventEndDateTime}
                                        </td>
                                        <td>
                                            {event.favoritesCount}
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                this.props.removeFavoriteEvent(this.props.user, event._id)
                                            }}>
                                                <b>X</b>
                                            </button>
                                        </td>
                                    </tr>)

                            }
                            </tbody>

                        </table>
                        : savedEvents
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {
                    this.props.user !== null ?

                        <div>
                            <img
                                alt="user's avatar"
                                className="Google-Image"
                                src={this.props.user.googleImageURL}/>
                            <h3>Welcome, {this.props.user.username}!</h3>
                            <h4>
                                Name: {this.props.user.firstName + " " + this.props.user.lastName}
                            </h4>
                            <h4>
                                Email: {this.props.user.email}
                            </h4>
                            <button className="Edit-Profile-Button" onClick={this.editProfile.bind(this)}>
                                Edit Username
                            </button>
                            {
                                this.renderSavedParks()
                            }
                        </div>
                        :
                        <h3 className="Not-Logged-In">
                            Login with Google
                        </h3>
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        parks: state.parks.parks,
        events: state.events.flattenedEvents,
        savedParks: state.user.savedParks,
    }
};

const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps)),
    removeFavouritePark: (user, parkId) => {
        dispatch(toggleSavedPark(user, parkId))
    },
    removeFavoriteEvent: (user, eventId) => {
        dispatch(toggleSavedEvent(user, eventId))
    },
    getSavedParks: (email) => dispatch(getSavedParksInfo(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);
