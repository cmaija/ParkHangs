import React from "react";
import Calendar from 'react-calendar'
import { connect } from "react-redux"
import { openModal } from "features/modal/modalSlice"
import 'components/CalendarWrapper.css'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

class CalendarWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date(),
            events: this.props.events[this.props.park._id],
        };
    }

    openModal = (events, date) => {
        const dateEvents = this.getCorrespondingEvents(date, events)
        const serializedDate = Date.parse(date)
        const props = {
            component: 'ModalDetail',
            componentParams: {
                park: this.props.park,
                events: dateEvents,
                date: serializedDate,
            }
        }
        console.log(props)
        this.props.openModal(props)
    }

    getCorrespondingEvents = (date, events) => {
        const dateMoment = moment(date)
        return events.filter((event) => {
            let eventDateMoment = this.convertToMoment(event.eventDateTime)
            console.log(eventDateMoment)
            console.log(dateMoment)
            return this.datesAreOnSameDay(eventDateMoment, dateMoment)
        })
    }

    tileClassName = (date, view, parkEvents) => {
        const generateClassNames = false
        if (parkEvents.length > 0) {
            const dateMoment = moment(date)
            const tileHasEvent = parkEvents.some((event) => {
                let eventDate = this.convertToMoment(event.eventDateTime)
                if (view === 'decade') {
                    return this.datesAreOnSameYear(eventDate, dateMoment)
                }

                if (view === 'year') {
                    return this.datesAreOnSameMonth(eventDate, dateMoment)
                }

                if (view === 'month') {
                    return this.datesAreOnSameDay(eventDate, dateMoment)
                }

                if (view === 'day') {
                    return this.datesAreOnSameDay(eventDate, dateMoment)
                }

            })
            return tileHasEvent ? 'date-has-event' : false
        }
    }

    convertToMoment = (date) => {
        let eventDate = date
        if (typeof eventDate === "string") {
            eventDate = parseInt(eventDate)
        }

        if (eventDate / 1000000000000 < 1) {
            eventDate *= 1000
        }

        eventDate = moment(eventDate)
        return eventDate
    }

    datesAreOnSameDay = (firstDay, secondDay) => {
        return moment(firstDay).isSame(secondDay, 'day')
    }

    datesAreOnSameMonth = (firstDay, secondDay) => {
        return moment(firstDay).isSame(secondDay, 'month')
    }

    datesAreOnSameYear = (firstDay, secondDay) => {
        return moment(firstDay).isSame(secondDay, 'year')
    }

    render() {
        const parkEvents = this.props.events[this.props.park._id] || []
        const that = this
        function generateTileClassName ({date, view}) {
            return that.tileClassName(date, view, parkEvents)
        }
        function openDetailModal (date) {
            that.openModal(parkEvents, date)
        }
        return (
            <div className="CalendarWrapper">
                <div>{this.props.park.name}</div>
                <div style={{width: "250px"}}>
                    <Calendar
                        onChange={openDetailModal}
                        value={this.state.date}
                        tileClassName={generateTileClassName}
                        defaultView="year"/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        events: state.parks.events
    }
}


const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);
