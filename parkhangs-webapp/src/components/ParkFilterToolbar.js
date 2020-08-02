import React from "react";
import { connect } from "react-redux";
import { queryParks } from 'features/parks/parksSlice'

class ParkFilterToolbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFacilities: [],
        }
    }

    handleSearchSubmit = () => {
        console.log('submit!')
    }

    handleSelectFacility = (event) => {
        event.preventDefault

        let facility = event.target.value
        if (!this.state.selectedFacilities.includes(facility)) {
            let selectedFacilities = this.state.selectedFacilities
            selectedFacilities.push(facility)
            this.setState({
                selectedFacilities: selectedFacilities
            })
        } else {
            console.log('its already in there')
            let selectedFacilities = this.state.selectedFacilities
            selectedFacilities = selectedFacilities.filter(selectedFacility => selectedFacility !== facility)
            this.setState({
                selectedFacilities: selectedFacilities
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSearchSubmit}>
                <div>Select a specific park</div>
                <div>Or, filter parks by parameters</div>
                <div>
                    <label id="facilities">Facilities</label>
                    <select onChange={this.handleSelectFacility} name="Select Park" id="eventPark">
                        {
                            this.props.facilities &&
                            this.props.facilities.map((facility) => {
                                return <option
                                    key={facility._id}
                                    value={facility.name}>{facility.name}</option>
                            })
                        }
                    </select>
                </div>
            </form>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    queryParks: (query) => dispatch(queryParks(query))
})

const mapStateToProps = (state) => ({
    queriedParks: state.parks.queriedParks,
    facilities: state.parks.facilities,
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkFilterToolbar)
