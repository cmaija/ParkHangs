import React from 'react'
import { connect } from 'react-redux'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'components/ParksCalendar.css'
import { openModal } from "features/modal/modalSlice"
import { selectPark } from 'features/parks/parksSlice'

import { cloneDeep } from 'lodash'

const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

class ParksCalendar extends React.Component {
    openModal = (event, park) => {
        const parkToSelect = this.props.parks.find(park => park._id === event.parkId)
        const props = {
            component: 'ModalEventDetail',
            componentParams: {
                eventId: event._id,
            }
        }
        this.props.selectPark(parkToSelect._id)
        this.props.openModal(props)
    }

    filterEvents = (parks) => {
        return this.props.events.filter((event) => {
            const eventsAtPark = parks.filter(park => {
                return event.parkId === park._id
            })
            return eventsAtPark.length > 0
        })
    }

    addNewEvent = (event) => {
        const start = event.start.getTime()
        const end = event.end.getTime()
        const props = {
            component: 'ModalNewEvent',
            componentParams: {
                selectedSlot: {
                    start,
                    end,
                },
            }
        }
        this.props.openModal(props)
    }

    eventStyleGetter = () => {
        const backgroundColor = '#4caf50';
        const style = {
            backgroundColor: backgroundColor,
        };
        return {
            style: style
        };
    }

    render() {
        let eventsArray

        if (this.props.showAllParks) {
            eventsArray = this.props.events
        } else {
            eventsArray = this.filterEvents(this.props.filteredParks)
        }

        eventsArray = eventsArray.map((event) => {
            let transformedEvent = cloneDeep(event)
            transformedEvent.eventDateTime = new Date(parseInt(transformedEvent.eventDateTime, 10) * 1000)
            if (!!event.eventEndDateTime) {
                transformedEvent.eventEndDateTime = new Date(parseInt(transformedEvent.eventEndDateTime, 10) * 1000)
            } else {
                const endTime = (parseInt(event.eventEndDateTime, 10) + 360) * 1000
                transformedEvent.eventEndDateTime = new Date(endTime)
            }

            const park = this.props.parks.find(park => park._id === transformedEvent.parkId)

            if (!!park && !!park.name) {
                transformedEvent.title = park.name
            } else {
                transformedEvent.title = 'park unknown'
            }
            return transformedEvent
        })

        return (
            <div className="eventsCalendar">
                <Calendar
                    localizer={localizer}
                    startAccessor="eventDateTime"
                    endAccessor="eventEndDateTime"
                    onSelectEvent={this.openModal}
                    events={eventsArray}
                    views={allViews}
                    selectable={true}
                    onSelectSlot={this.addNewEvent}
                    eventPropGetter={this.eventStyleGetter}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events.flattenedEvents,
        parks: state.parks.parks,
        filteredParks: state.parks.filteredParks,
    }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps)),
    selectPark: (parkId) => dispatch(selectPark(parkId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksCalendar);
