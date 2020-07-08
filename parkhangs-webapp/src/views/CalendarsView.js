import React, {Component} from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import Searchbar from '../components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'
import apis from '../api/index'

class CalendarsView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAllParks: false,
        }
    }

    componentDidMount = async () => {
        this.props.getAllEvents();
    };

    toggleShowAllParks = (show) => {
        console.log(this.props.events)
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
        events: state.parks.eventsById
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllEvents: () => dispatch(apis.fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsView);
