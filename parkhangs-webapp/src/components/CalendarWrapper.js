import React from "react";
import Calendar from 'react-calendar'
import { connect } from "react-redux"
import { openModal } from "features/modal/modalSlice"
import 'components/CalendarWrapper.css'
import 'react-calendar/dist/Calendar.css'

class CalendarWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date(), // TODO: need to determine what exactly the selectedDateQuery format should be
        };
    }

    openDetailModal = (date) => {
        const events = this.getCorrespondingEvents(date)
        const props = {
            component: 'ModalDetail',
            componentParams: {
                events,
            }
        }

        this.props.openModal(props)
    }

    eventDates = () => {
        // TODO: Events geet loaded here. Not sure how you want to do it,
        // either get all the events and store them in the store, or when this component mounts,
        // make a request by parkid. The search bar needs to be a bit smarter or we need to paginate
        // this calendar view page because I think 150 calendars is too many calendars to show at once.
        return this.props.events.map(event => new Date(event.eventDateTime))
    }

    getCorrespondingEvents = (date) => {
      console.log(this.props.events)
        return this.props.events.filter((event) => {
            return this.datesAreOnSameDay(new Date(event.eventDateTime), date)})
    }

    tileClassName = ({ date, view }) => {
        if (view === 'decade') {
            if (this.eventDates().some(eventDate => this.datesAreOnSameYear(eventDate, date))) {
                return 'date-has-event'
            }
        }

        if (view === 'year') {
            if (this.eventDates().some(eventDate => this.datesAreOnSameMonth(eventDate, date))) {
                return 'date-has-event'
            }
        }

        if (view === 'month') {
            if (this.eventDates().some(eventDate => this.datesAreOnSameDay(eventDate, date))) {
                return 'date-has-event'
            }
        }

        if (view === 'day') {
            if (this.eventDates().some(eventDate => this.datesAreOnSameDay(eventDate, date))) {
                return 'date-has-event'
            }
        }
    }

    datesAreOnSameDay = (firstDay, secondDay) => {
        return firstDay.getFullYear() === secondDay.getFullYear() &&
        firstDay.getMonth() === secondDay.getMonth() &&
        firstDay.getDate() === secondDay.getDate()
    }

    datesAreOnSameMonth = (firstDay, secondDay) => {
        return firstDay.getFullYear() === secondDay.getFullYear() &&
        firstDay.getMonth() === secondDay.getMonth()
    }

    datesAreOnSameYear = (firstDay, secondDay) => {
        return firstDay.getFullYear() === secondDay.getFullYear()
    }

    render() {
        return (
            <div className="CalendarWrapper">
                <div>{this.props.park.name}</div>
                <div style={{width: "250px"}}>
                    <Calendar
                        onChange={this.openDetailModal}
                        value={this.state.date}
                        tileClassName={this.tileClassName}
                        defaultView="year"/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        events: state.parks.eventsById
    }
}


const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);
