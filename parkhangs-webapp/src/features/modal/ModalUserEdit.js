import React from "react";
import {connect} from "react-redux";
import {editUsername} from "features/users/userSlice";
import "features/modal/ModalUserEdit.css";

class ModalUserEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newUserName: this.props.user.username,
            invalidInput: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.submitChanges = this.submitChanges.bind(this);

    }

    handleUsernameChange(event) {
        this.setState({
            newUserName: event.target.value
        })
    }

    submitChanges(event) {
        event.preventDefault();
        if (this.state.newUserName === "") {
            this.setState({
                invalidInput: true
            })

        } else {

            const userId = this.props.user._id;
            this.props.editUsername(userId, this.state.newUserName.trim());

            this.setState({
                invalidInput: false
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.submitChanges} className="Edit-Form">
                <div>
                    Edit your username:
                </div>
                <input className="Edit-Form-Input"
                       placeholder="Enter a new username"
                       onChange={this.handleUsernameChange}
                       value={this.state.newUserName}
                       name="usernameEdit"/>
                {
                    this.state.invalidInput ?
                        <div>
                            There is something wrong with your input. Try again!
                        </div>
                        : null
                }
                <button onClick={this.submitChanges}>
                    Edit
                </button>
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    editUsername: (userId, username) => {
        dispatch(editUsername(userId, username))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEdit);