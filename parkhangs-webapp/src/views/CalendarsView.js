import React, {Component} from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import Searchbar from '../components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'
import apis from '../api/index'
import { fetchEventsById } from 'features/parks/parksSlice.js'

class CalendarsView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAllParks: false,
        }
    }

    componentDidMount = async () => {
        if (this.props.parks.length === 0) {
            this.props.getAllParks()
        }
        this.props.getAllEvents()
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
                <Searchbar onSearch={this.toggleShowAllParks} placeholder="Search..."/>
                <button className="ShowAllButton" onClick={this.toggleShowAllParks}>Show all parks</button>
                <div className="CalendarList">
                { this.state.showAllParks
                    ? this.props.parks.map((park) => {
                        return <CalendarWrapper key={park._id} park={park}/>
                    })
                    : this.props.filteredParks.map((park) => {
                        return <CalendarWrapper key={park._id} park={park}/>
                    })

                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parks: state.parks.parks,
        filteredParks: state.parks.filteredParks,
        events: state.parks.events,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllParks: () => dispatch(apis.fetchParks()),
    getAllEvents: () => dispatch(apis.fetchEvents()),
    fetchEvents: (parkId) => dispatch(fetchEventsById(parkId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsView);
