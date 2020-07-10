import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import apis from '../api/index';
import { connect } from 'react-redux'
import { addSortedEvents } from 'features/parks/parksSlice';


class MapView extends Component {

  componentDidMount = async () => {
      this.props.getAllEvents()
      console.log(this.props.events)
      this.sortEvents()
      console.log(this.props.filteredEvents)
    }

  // componentDidMount = () => {
  //   (async () => {
  //     let res = await this.props.getAllEvents()
  //     console.log(this.props.events)
  //     this.sortEvents()
  //     console.log(this.props.filteredEvents)
  //   })()
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

  sortEvents = () => {
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

    render() {
        return (
            <div className="MapView">
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
