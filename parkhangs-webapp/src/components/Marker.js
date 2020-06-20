import React, { Component } from 'react';
import DetailModal from './DetailModal.js'
import { selectPark } from '../features/parks/parksSlice.js'
import MarkerIcon from '../images/marker.png'
import { connect } from 'react-redux'

class Marker extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.props.selectParkID(this.props.text);
    alert("You've Selected: " + this.props.text + " Upcoming event at this park: " + this.props.events[0].eventTime);
  }

  render() {
    return (
      <div>
        <img src={MarkerIcon} />
        <div className="marker"
          onClick={()=>{this.handleSelect()}}
          >
          {this.props.text}
        </div>
      </div>
      );
    };
  }

  const mapStateToProps = (state) => { //name is by convention
    return { selected: state.parks.selectedPark }; //now it will appear as props
  }

  const mapDispatchToProps = (dispatch) => ({
    selectParkID: (parkID) => dispatch(selectPark(parkID))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Marker);
  // export default Marker;
