import React from "react";
import { connect } from "react-redux";
import { filterParks } from 'features/parks/parksSlice'
import Select from 'react-select'

class Searchbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedParks: []
        }
    }

    getParksOptions = () => {
        return this.props.parks.map(((park) => {
            return {
                value: park.name,
                label: park.name,
            }
        }))
    }

    handleSelectedPark = selectedParks => {
        this.setState({selectedParks: selectedParks.map(park => park.value)})
    }

    handleSearchSubmit = () => {
        this.props.setFilter(this.state.selectedParks)
        this.props.onSearch(false)
    }

    render() {
        const parksOptions = this.getParksOptions()
        return (
            <div className="searchbar">
                <Select
                    id="parkSearch"
                    isMulti={true}
                    isClearable={true}
                    options={parksOptions}
                    className="multi-select"
                    onChange={this.handleSelectedPark} />
                <button type="submit" onClick={this.handleSearchSubmit}>
                    <i className="fa fa-search"/>
                </button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    setFilter: (filter) => dispatch(filterParks(filter))
})

const mapStateToProps = (state) => ({
    parks: state.parks.parks
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
