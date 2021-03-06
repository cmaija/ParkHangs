import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {
    getUser,
    setAccessToken,
    logout,
    getSavedParksInfo,
} from 'features/users/userSlice'
import './GoogleUserAuthentication.css'


const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;

class GoogleUserAuthorization extends Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(response) {

        if (response.accessToken) {

            const firstName = response.profileObj.givenName;
            const lastName = response.profileObj.familyName;
            const email = response.profileObj.email;
            const accessToken = response.accessToken;
            const googleImageURL = response.profileObj.imageUrl;

            //get the user
            const user = {

                firstName: firstName,
                lastName: lastName,
                email: email,
                googleImageURL: googleImageURL
            };

            this.props.setAccessToken(accessToken);
            this.props.getUser(user)
            this.props.getSavedParksInfo(user.email)
        }
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn ?
                    <GoogleLogout
                        className="google-button-styling"
                        clientId={CLIENT_ID}
                        buttonText="Logout"
                        icon={false}
                        onLogoutSuccess={this.props.logout}
                    >
                    </GoogleLogout> : <GoogleLogin
                        className="google-button-styling"
                        clientId={CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.login}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => ({
    setAccessToken: (accessToken) => dispatch(setAccessToken(accessToken)),
    getUser: (user) => dispatch(getUser(user)),
    logout: () => dispatch(logout()),
    getSavedParksInfo: (email) => dispatch(getSavedParksInfo(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleUserAuthorization);
