import React, {Component} from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import Searchbar from '../components/Searchbar'
import { connect } from 'react-redux'
import './CalendarsView.css'

class CalendarsView extends Component {
    render() {
        return (
            <div className="CalendarsView">
                <Searchbar placeholder="Search..."/>
                <div className="CalendarList">
                {
                    this.props.parks.map((park) => {
                        return <CalendarWrapper key={park.id} park={park}/>
                    })
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parks: state.parks.parks,
    }
}

export default connect(mapStateToProps, null)(CalendarsView);
