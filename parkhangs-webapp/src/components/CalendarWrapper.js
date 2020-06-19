import React from "react";
import Calendar from 'react-calendar';
import DetailModal from "./DetailModal";
import {connect} from "react-redux";

class CalendarWrapper extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            selectedDate: new Date(), // TODO: need to determine what exactly the selectedDateQuery format should be
            showCalendar: false,
            showEventPopup: false
        };


        this.onChange = this.onChange.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
    }

    onChange() {
        //alert("You selected: " + date);

        this.setState(
            {
                showCalendar: false,
                showEventPopup: true
            }
        );
        // TODO: need to pass in the date to make some sort of a query to the db to view/create/modify/delete events

    };

    closeDetailModal() {

        this.setState({
                showEventPopup: !this.state.showEventPopup
            }
        );
    }

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

                <DetailModal close={this.closeDetailModal} showModal={this.state.showEventPopup}
                             events={this.props.events}/>
            </div>
        );

    }
}


const mapStateToProps = (state) => {

    function filterEvents(state) {
        const events = [];

        //TODO: find the actual park first instead of all the parks (later tasks)

        // crappy for loop but just demo purposes for now

        for (let i = 0; i < state.parks.parks.length; i++) {

            for (let j = 0; j < state.parks.parks[i].events.length; j++) {

                events.push(state.parks.parks[i].events[j]);
            }

        }

        return events;
    }

    return {
        events: filterEvents(state)
    }

};

export default connect(mapStateToProps, null)(CalendarWrapper);

