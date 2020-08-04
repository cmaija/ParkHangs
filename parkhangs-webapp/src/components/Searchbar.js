import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { filterParks } from 'features/parks/parksSlice'
import Select from 'react-select'
import 'components/Searchbar.css'

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
        this.setState({selectedParks: selectedParks})
    }

    handleSearchSubmit = () => {
        this.props.setFilter(this.state.selectedParks.map(park => park.label))
        this.props.onSearch(false)
    }

    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 90,
        })
    }

    clearSearch = () => {
        this.setState({selectedParks: []})
    }

    toggleShowAllParks = () => {
        this.props.onShowAll(true)
        this.clearSearch()
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
                    styles={this.customStyles}
                    value={this.state.selectedParks}
                    placeholder="Select parks to see their events"
                    className="search-multi-select"
                    onChange={this.handleSelectedPark} />
                <button className="search-parks-button" onClick={this.handleSearchSubmit}>
                    <i className="fa fa-search"/>
                </button>
                <button className="ShowAllButton" onClick={this.toggleShowAllParks}>Show all parks</button>
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
