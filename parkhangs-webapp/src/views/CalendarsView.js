import React, {Component} from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import Searchbar from '../components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'

class CalendarsView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAllParks: false,
        }
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
                        return <CalendarWrapper key={park.id} park={park}/>
                    })
                    : this.props.filteredParks.map((park) => {
                        return <CalendarWrapper key={park.id} park={park}/>
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
        filteredParks: state.parks.filteredParks
    }
}

const mapDispatchToParks = (state) => {}

export default connect(mapStateToProps, null)(CalendarsView);
