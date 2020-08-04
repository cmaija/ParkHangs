import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';

class ShareCalendar extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          showDetails: false
      }
  }

  render() {
    let icon= { 'calendar-plus-o': 'left' };
    let items= [
      {google: 'Google'},
      {apple: 'Apple'}
    ]

    return <AddToCalendar
                        event={this.props.event}
                        buttonTemplate={icon}
                        buttonLabel=""
                        listItems={items}
            />;
  };
}
export default ShareCalendar;
