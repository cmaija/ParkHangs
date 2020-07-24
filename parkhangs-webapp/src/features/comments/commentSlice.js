import { createSlice } from '@reduxjs/toolkit'
import CommentService from 'services/comment.service'

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByParkId: {},
        flattenedComments: [],
        loadingComments: true,
        addingComment: false,
        error : null
    },
    reducers: {
        fetchParkCommentsStart (state) {
            state.loadingParks = true
            state.error = null
        },

        fetchParkCommentsSuccessful (state, action) {
            const events = action.payload
            state.flattenedComments = action.payload
            const parsedComments = events.reduce(function (acc, comment) {
                const parkId = comment.parkId.toString()
                const hasSeenParkSoFar = !!acc[parkId]
                if (hasSeenParkSoFar) {
                    acc[parkId].push(comment)
                }
                else {
                    acc[parkId] = [comment]
                }
                return acc
            }, {})
            state.commentsByParkId = parsedComments
        },

        fetchParkCommentsFailure (state, action) {
            state.loadingComments= false
            state.error = action.payload
        },

        addParkCommentStart (state, action) {
            state.addingComment = true
            state.error = null
        },

        addParkCommentSuccessful (state, action) {
            const newComment = action.payload
            const parkId = newComment.parkId
            const currentComments = state.commentsByParkId[parkId]
            currentComments.push(newComment)

            state.commentsByParkId[parkId] = currentComments
            state.addingComment = false
            state.error = null
        },

        addParkCommentFailure (state, action) {
            state.addingComment = false
            state.error = action.payload
        }
    }
})

export const {
    fetchParkCommentsStart,
    fetchParkCommentsSuccessful,
    fetchParkCommentsFailure,
    addParkCommentStart,
    addParkCommentSuccessful,
    addParkCommentFailure,
} = commentSlice.actions

export default commentSlice.reducer

export const fetchParkComments = () => async dispatch => {
    try {
        dispatch(fetchParkCommentsStart())
        const parkComments = await CommentService.getParkComments()
        dispatch(fetchParkCommentsSuccessful(parkComments))
    } catch (error) {
        dispatch(fetchParkCommentsFailure(error.toString()))
    }
}

export const addParkComment = (newComment) => async dispatch => {
    try {
        dispatch(addParkCommentStart())
        const successfulNewComment = await CommentService.addParkComment(newComment)
        dispatch(addParkCommentSuccessful(successfulNewComment))
    } catch (error) {
        dispatch(addParkCommentFailure(error.toString()))
    }
}

// export const deleteEvent = (eventId, parkId) => async dispatch => {
//     try {
//         dispatch(deleteEventStart())
//         const successfulDeletedEvent = await EventService.deleteEvent(eventId, parkId)
//         dispatch(deleteEventSuccessful(successfulDeletedEvent))
//     } catch (error) {
//         dispatch(deleteEventFailure(error.toString()))
//     }
// }
