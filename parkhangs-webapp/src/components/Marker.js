import React, { Component } from 'react';
import DetailModal from './DetailModal.js'
import MarkerIcon from '../images/marker.png'

class Marker extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    console.log(this.props.text);
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


  // const Marker = (props: any) => {
  //   const { text, events } = props;
  //   return (
  //     <div className="marker"
  //       onClick={()=>{alert("You've Selected: " + text + " Upcoming event at this park: " + events[0].eventTime)}}
  //       >
  //       {text}
  //       </div>
  //     );
  //   };
  // }


export default Marker;
