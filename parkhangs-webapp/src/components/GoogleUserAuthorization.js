import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {
    getUser,
    setAccessToken,
    logout
} from 'features/users/userSlice'


const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;

class GoogleUserAuthorization extends Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
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
            this.props.getUser(user);
        }
    }

    handleLoginFailure(response) {
        //TODO
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        //TODO
        alert('Failed to log out')
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.props.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText='Login'
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
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
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleUserAuthorization);