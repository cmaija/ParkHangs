import React from 'react'
import { connect } from 'react-redux'
import { addParkComment } from 'features/comments/commentSlice'
import moment from 'moment'
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
        const parkId = this.props.parkId;

        const newComment = {
          parkId: this.props.parkId,
          comment: commentText
        }
        this.props.addParkComment(newComment)
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

const mapDispatchToProps = (dispatch) => ({
    addParkComment: (newComment) => dispatch(addParkComment(newComment)),
})

export default connect(null, mapDispatchToProps)(CommentForm);
