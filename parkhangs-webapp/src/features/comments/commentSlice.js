import { createSlice } from '@reduxjs/toolkit'
import CommentService from 'services/comment.service'

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByParkId: {},
        commentsByEventId: {},
        flattenedParkComments: [],
        flatennedEventsComments: [],
        loadingParkComments: true,
        loadingEventComments: false,
        deletingParkComment: false,
        deletingEventComment: false,
        addingComment: false,
        error : null
    },
    reducers: {
        fetchParkCommentsStart (state) {
            state.loadingParkComments = true
            state.error = null
        },

        fetchParkCommentsSuccessful (state, action) {
            const comments = action.payload
            state.flattenedParkComments = action.payload
            const parsedComments = comments.reduce(function (acc, comment) {
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
            state.loadingParkComments = false
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
        },

        fetchEventCommentsStart (state) {
            state.loadingEventComments = true
            state.error = null
        },

        fetchEventCommentsSuccessful (state, action) {
            const events = action.payload
            state.flattenedEventsComments = action.payload
            const parsedComments = events.reduce(function (acc, comment) {
                const eventId = comment.eventId.toString()
                const hasSeenEventSoFar = !!acc[eventId]
                if (hasSeenEventSoFar) {
                    acc[eventId].push(comment)
                }
                else {
                    acc[eventId] = [comment]
                }
                return acc
            }, {})
            state.commentsByEventId = parsedComments
        },

        fetchEventCommentsFailure (state, action) {
            state.loadingEventComments = false
            state.error = action.payload
        },

        addEventCommentStart (state, action) {
            state.addingEventComment = true
            state.error = null
        },

        addEventCommentSuccessful (state, action) {
            const newComment = action.payload
            const eventId = newComment.eventId
            const currentComments = state.commentsByEventId[eventId]
            currentComments.push(newComment)

            state.commentsByEventId[eventId] = currentComments
            state.addingComment = false
            state.error = null
        },

        addEventCommentFailure (state, action) {
            state.addingEventComment = false
            state.error = action.payload
        },

        deleteParkCommentStart (state, action) {
            state.deletingParkComment = true
            state.error = null
        },

        deleteParkCommentSuccessful (state, action) {
            const { _id, parkId } = action.payload
            const newCommentArray = state.commentsByParkId[parkId].filter(comment => comment._id !== _id)
            state.commentsByParkId[parkId] = newCommentArray
            state.deletingParkComment = false
            state.error = null
        },

        deleteParkCommentFailure (state, action) {
            state.deletingParkComment = true
            state.error = action.payload
        },

        deleteEventCommentStart (state, action) {
            state.deletingEventComment = true
            state.error = null
        },

        deleteEventCommentSuccessful (state, action) {
            const { _id, eventId } = action.payload
            const newCommentArray = state.commentsByEventId[eventId].filter(comment => comment._id !== _id)
            state.commentsByEventId[eventId] = newCommentArray
            state.deletingEventComment = false
            state.error = null
        },

        deleteEventCommentFailure (state, action) {
            state.deletingEventComment = true
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
    fetchEventCommentsStart,
    fetchEventCommentsSuccessful,
    fetchEventCommentsFailure,
    addEventCommentStart,
    addEventCommentSuccessful,
    addEventCommentFailure,
    deleteParkCommentStart,
    deleteParkCommentSuccessful,
    deleteParkCommentFailure,
    deleteEventCommentStart,
    deleteEventCommentSuccessful,
    deleteEventCommentFailure
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

export const addParkComment = (newComment, user) => async dispatch => {
    try {
        dispatch(addParkCommentStart())
        const successfulNewComment = await CommentService.addParkComment(newComment, user)
        dispatch(addParkCommentSuccessful(successfulNewComment))
    } catch (error) {
        dispatch(addParkCommentFailure(error.toString()))
    }
}

export const fetchEventComments = () => async dispatch => {
    try {
        dispatch(fetchEventCommentsStart())
        const eventComments = await CommentService.getEventComments()
        dispatch(fetchEventCommentsSuccessful(eventComments))
    } catch (error) {
        dispatch(fetchEventCommentsFailure(error.toString()))
    }
}

export const addEventComment = (newComment, user) => async dispatch => {
    try {
        dispatch(addEventCommentStart())
        const successfulNewComment = await CommentService.addEventComment(newComment, user)
        dispatch(addEventCommentSuccessful(successfulNewComment))
    } catch (error) {
        dispatch(addEventCommentFailure(error.toString()))
    }
}

export const deleteParkComment = (parkCommentId, parkId) => async dispatch => {
    try {
        dispatch(deleteParkCommentStart())
        const successfulDeletedComment = await CommentService.deleteParkComment(parkCommentId)
        dispatch(deleteParkCommentSuccessful(successfulDeletedComment))
    } catch (error) {
        dispatch(deleteParkCommentFailure(error.toString()))
    }
}

export const deleteEventComment = (eventCommentId, eventId) => async dispatch => {
    try {
        dispatch(deleteEventCommentStart())
        const successfulDeletedComment = await CommentService.deleteEventComment(eventCommentId)
        dispatch(deleteEventCommentSuccessful(successfulDeletedComment))
    } catch (error) {
        dispatch(deleteEventCommentFailure(error.toString()))
    }
}
