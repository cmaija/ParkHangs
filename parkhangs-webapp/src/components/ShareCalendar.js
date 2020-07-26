import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import "react-add-to-calendar/dist/react-add-to-calendar.css";

 
class ShareCalendar extends React.Component {
  
  constructor(props){
      super(props);

      this.state = {
          showDetails: false
      }
  }
 
  render() {
    let icon = { 'calendar-plus-o': 'left' };

    return <AddToCalendar 
                        event={this.props.event}
                        buttonTemplate={icon}
            />;
  };
}
export default ShareCalendar;