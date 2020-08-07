import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';

class ShareCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        }
    }

    render() {
        let icon = {'calendar-plus-o': 'center'};

        let items = [
            {outlook: 'Outlook'},
            {apple: 'iCal'},
            {yahoo: 'Yahoo!'},
            {google: 'Google'}
        ];

        return <AddToCalendar
            buttonWrapperClass="react-add-to-calendar-wrapper"
            event={this.props.event}
            buttonTemplate={icon}
            listItems={items}
            dropdownClass="dropdown"
            buttonLabel=""
        />
    }
}

export default ShareCalendar;
