import React from 'react'
import { connect } from 'react-redux'
import { addParkComment, addEventComment } from 'features/comments/commentSlice'
import './CommentForm.css'

class CommentForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            comments: this.comment()
        }
    }

    comment = () => {
        return this.props.comment || ''
    }

    handleUpdateComment = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleAddComment = (comment) => {
        event.preventDefault()

        const commentText =  this.state.comment || this.comment()

        if ("parkId" in this.props) {
          const parkId = this.props.parkId;
          const newComment = {
            parkId: parkId,
            comment: commentText
          }
          this.props.addParkComment(newComment, this.props.user)
        } else if ("eventId" in this.props) {
          const eventId = this.props.eventId;
          const newComment = {
            eventId: eventId,
            comment: commentText
          }
            this.props.addEventComment(newComment, this.props.user)
        }
        this.setState({
            comments: ''
          })
        }

    render() {
        const comment = this.comment();

        return (
            <div className="CommentForm">

                <form className="CommentForm">
                    <div className="formsection comment">
                        <label htmlFor="comment">Comment: </label>
                        <textarea
                            onChange={this.handleUpdateComment}
                            id="comment"
                            defaultValue={comment}/>
                    </div>
                </form>
                <button className={"submit-message-button leftButton"}
                        onClick={this.handleAddComment}>
                    <span>{'Add Comment'}</span>
                </button>
            </div>)

    }
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
    addParkComment: (newComment, user) => dispatch(addParkComment(newComment, user)),
    addEventComment: (newComment, user) => dispatch(addEventComment(newComment, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
