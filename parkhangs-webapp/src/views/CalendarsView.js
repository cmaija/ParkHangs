import React, {Component} from 'react';
import ParksCalendar from 'components/ParksCalendar'
import Searchbar from 'components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'
import { fetchParks } from 'features/parks/parksSlice'
import { fetchEvents } from 'features/events/eventsSlice'
import { fetchEventComments } from 'features/comments/commentSlice'

class CalendarsView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAllParks: true,
        }
    }

    componentDidMount = async () => {
        if (this.props.parks.length === 0) {
            this.props.getAllParks()
        }
        this.props.getAllEvents()
        this.props.getAllComments()
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
                <Searchbar onSearch={this.toggleShowAllParks} placeholder="Search for a park"/>
                <button className="ShowAllButton" onClick={this.toggleShowAllParks}>Show all parks</button>
                <div className="CalendarList">
                <ParksCalendar showAllParks={this.state.showAllParks}/>
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

const mapDispatchToProps = (dispatch) => ({
    getAllParks: () => dispatch(fetchParks()),
    getAllEvents: () => dispatch(fetchEvents()),
    getAllComments:() => dispatch(fetchEventComments())
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsView);
