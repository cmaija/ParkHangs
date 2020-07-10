import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import apis from '../api/index';
import { connect } from 'react-redux'
import { addSortedEvents } from 'features/parks/parksSlice';


class MapView extends Component {

  componentDidMount = async () => {
    await this.props.getAllEvents()
    await this.sortEvents()
    console.log(this.props.events)
    }

  sortEvents = async () => {
    const sortedEvents = {};
    this.props.events.map((event) => {
      const key = event.parkId.toString()
      if (!(key in sortedEvents)) {
      sortedEvents[key] = [event];
    } else {
      sortedEvents[key].push(event)
    }
  })
    console.log(sortedEvents)
    this.props.addEvents(sortedEvents);
  }

  handleClick = () => {
    this.sortEvents()
    console.log(this.props.events)
    console.log(this.props.filteredEvents)
  }

    render() {
        return (
            <div className="MapView">
            <div>
              <button className="test" onClick={this.handleClick}>test</button>
            </div>
                <Map/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.parks.events,
        filteredEvents: state.parks.eventsById
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllEvents: () => dispatch(apis.fetchEvents()),
    addEvents: (sortedEvents) => dispatch(addSortedEvents(sortedEvents))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
