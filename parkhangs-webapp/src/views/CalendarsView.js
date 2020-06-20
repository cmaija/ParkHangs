import React, {Component} from 'react';
import CalendarWrapper from '../components/CalendarWrapper';

class CalendarsView extends Component {
    render() {
        console.log('calendar')
        return (
            <div className="CalendarsView">
                <CalendarWrapper/>
            </div>
        );
    }
}

export default CalendarsView;
