import React from 'react'
import {connect} from 'react-redux'
import {openModal} from "../features/modal/modalSlice";
import "components/index.css";
import {toggleSavedPark} from "../features/users/userSlice";


class UserProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.editProfile = this.editProfile.bind(this);
        this.renderSavedParks = this.renderSavedParks.bind(this);
    }

    editProfile = () => {
        const modalProps = {
            component: 'ModalUserEdit',
        };

        this.props.openModal(modalProps);

    };

    renderSavedParks() {

        const savedParkIds = this.props.user.savedParks;

        if (savedParkIds.length === 0) {
            return <div> You do not have any saved parks!</div>;
        }

        let savedParkObjects = [];

        const parks = this.props.parks;

        savedParkIds.forEach((parkId) => {

            parks.find((park) => {
                if (park._id === parkId) {
                    savedParkObjects.push(park);
                }
            });
        });


        return (
            <div>


                <h3 className="Favourite-Parks-Title">
                    Favourite Parks:
                </h3>
                <table className="Favourite-Parks-Table">
                    <thead>
                    <tr>
                        <td className="Favourite-Parks-Table-Rows">
                            <b>Park name: </b>
                        </td>
                        <td className="Favourite-Parks-Table-Rows">
                            <b>Address:</b>
                        </td>
                        <td className="Favourite-Parks-Table-Rows">
                            <b>Rating:</b>
                        </td>
                        <td className="Favourite-Parks-Table-Rows">
                            <b>Remove from Favourites</b>
                        </td>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        savedParkObjects.map((park) =>
                            <tr key={park._id}>
                                <td>
                                    {park.name}
                                </td>
                                <td>
                                    {park.streetNumber + " " + park.streetName}
                                </td>
                                <td>
                                    {park.rating}
                                </td>
                                <td>
                                    <button onClick={() => {
                                        this.props.removeFavouritePark(this.props.user, park._id)
                                    }}>
                                        <b>X</b>
                                    </button>
                                </td>
                            </tr>
                        )

                    }

                    </tbody>

                </table>
            </div>

        )
    }

    render() {
        return (
            <div>
                {
                    this.props.user !== null ?

                        <div>
                            <img className="Google-Image" src={this.props.user.googleImageURL}/>
                            <h2>Welcome, {this.props.user.username}</h2>
                            <h3>
                                Full Name: {this.props.user.firstName + " " + this.props.user.lastName}
                            </h3>
                            <h3>
                                Email: {this.props.user.email}
                            </h3>
                            {
                                this.renderSavedParks()
                            }
                            <button className="Edit-Profile-Button" onClick={this.editProfile.bind(this)}>
                                Edit Profile
                            </button>
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
        parks: state.parks.parks
    }
};

const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps)),
    removeFavouritePark: (user, parkId) => {
        dispatch(toggleSavedPark(user, parkId))
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);
