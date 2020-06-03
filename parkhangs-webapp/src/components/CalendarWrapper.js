import React from "react";
import Calendar from 'react-calendar'

class CalendarWrapper extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            selectedDate: new Date(), // TODO: need to determine what exactly the selectedDateQuery format should be
            showCalendar: false
        };


        this.onChange = this.onChange.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
    }

    onChange(date) {
        alert("You selected: " + date);

        this.setState(
            {
                selectedDate: date,
                showCalendar: false
            }
        );
        // TODO: need to pass in the date to make some sort of a query to the db to view/create/modify/delete events

    };

    toggleCalendar() {

        this.setState({
            showCalendar: !this.state.showCalendar
        });
    }

    render() {
        return (
            <div>
                <i onClick={this.toggleCalendar} className="far fa-calendar-alt"/>
                {
                    this.state.showCalendar ?
                        <div style={{width: "250px"}}>
                            <Calendar onChange={this.onChange} value={this.state.date}/>
                        </div> : null
                }
            </div>
        );

    }
}

export default CalendarWrapper;
