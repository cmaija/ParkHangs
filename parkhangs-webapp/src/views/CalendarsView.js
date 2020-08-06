import React, {Component} from 'react';
import ParksCalendar from 'components/ParksCalendar'
import Searchbar from 'components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'

class CalendarsView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAllParks: true,
        }
    }

    onSearch = (showAllParks) => {
        this.toggleShowAllParks(showAllParks)
    }

    toggleShowAllParks = (show) => {
        this.setState((state) => {
          return { showAllParks: show }
        })
    }

    render() {
        return (
            <div className="CalendarsView">
                <div className="search">
                    <Searchbar onShowAll={this.toggleShowAllParks} onSearch={this.toggleShowAllParks}/>
                </div>
                <div className="CalendarList">
                <ParksCalendar showAllParks={this.state.showAllParks}/>
                </div>
                <div id="AddEventMessage">
                To Add an Event, Click on the Date of the Event
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parks: state.parks.parks,
        filteredParks: state.parks.filteredParks,
        events: state.events.eventsByParkId,
    }
}

export default connect(mapStateToProps, null)(CalendarsView);
