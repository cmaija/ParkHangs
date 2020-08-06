import React from 'react'
import { connect } from 'react-redux'
import { queryParks, resetQuery, saveFilterState } from 'features/parks/parksSlice'
import Select from 'react-select'
import { cloneDeep } from 'lodash'
import 'components/ParkFilterToolbar.css'
import AddressSearchBar from 'components/AddressSearchBar'

class ParkFilterToolbar extends React.Component {

    constructor(props) {
        super(props)
        if (Object.keys(this.props.currentFilters).length > 0) {
            this.state = this.props.currentFilters
        } else {
            this.state = {
                selectedFacilities: [],
                selectedSpecialFeatures: [],
                hasWashrooms: false,
                minRating: '',
                maxRating: '',
                minSize: '',
                maxSize: '',
                parkName: '',
                distance: '',
                lat: '',
                lon: '',
                minRatingValid: true,
                maxRatingValid: true,
                minSizeValid: true,
                maxSizeValid: true,
            }
        }
    }

    fieldsAreValid = () => {
        return this.state.minRatingValid
            && this.state.maxRatingValid
            && this.state.minSizeValid
            && this.state.maxSizeValid
    }

    handleSearchSubmit = event => {
        event.preventDefault()
        if (!this.props.loadingParks) {
            this.clearSelectedParkName()
            this.props.saveFilterState(this.state)

            const specialFeatures = this.state.selectedSpecialFeatures.length > 0
                ? this.state.selectedSpecialFeatures.map(feature => feature.label)
                : []

            const facilities = this.state.selectedFacilities.length > 0
                ? this.state.selectedFacilities.map(facility => facility.label)
                : []

            let searchParams = {
                hasWashrooms: this.state.hasWashrooms,
                facilities: facilities,
                specialFeatures: specialFeatures,
                sizeGte: this.state.minSize,
                sizeLte: this.state.maxSize,
                ratingGte: this.state.minRating,
                ratingLte: this.state.maxRating,
                lat: this.state.lat,
                lon: this.state.lon,
                distance: this.state.distance,
            }

            searchParams = this.pruneSearchParams(searchParams)

            if (Object.keys(searchParams).length > 0 && this.fieldsAreValid()) {
                this.props.queryParks(searchParams)
            }
        }
    }

    pruneSearchParams = searchParams => {
        let params = cloneDeep(searchParams)
        for (let param of Object.keys(params)) {
            if (params[param] === undefined || params[param].length === 0) {
                delete(params[param])
            }

            if (param === 'hasWashrooms' && !params[param]) {
                delete(params[param])
            }

        }
        return params
    }

    handleSelectFacility = selectedFacilities => {
        const selected = selectedFacilities
        this.setState({selectedFacilities: selected})
    }

    handleSelectSpecialFeature = selectedSpecialFeatures => {
        const selected = selectedSpecialFeatures
        this.setState({selectedSpecialFeatures: selected})
    }

    handleDistanceInput = event => {
        event.preventDefault()
        let parsedInput = parseFloat(event.target.value, 10)
        if (Number.isNaN(parsedInput)) {
            parsedInput = ''
        }
        this.setState({distance: parsedInput})
    }

    handleSelectWashrooms = event => {
        const selected = this.state.hasWashrooms
        this.setState({hasWashrooms: !selected})
    }

    handleMinimumRatingInput = event => {
        event.preventDefault()
        let parsedInput = parseInt(event.target.value, 10)
        if (Number.isNaN(parsedInput)) {
            parsedInput = ''
        }
        this.setState({minRating: parsedInput}, () => {
            this.validateMinRating()
            this.validateMaxRating()
        })
    }

    handleMaximumRatingInput = event => {
        event.preventDefault()
        let parsedInput = parseInt(event.target.value, 10)
        if (Number.isNaN(parsedInput)) {
            parsedInput = ''
        }
        this.setState({maxRating: parsedInput}, () => {
            this.validateMinRating()
            this.validateMaxRating()
        })
    }

    clearMinRating = event => {
        event.preventDefault()
        this.setState({minRating: ''}, () => {
            this.validateMinRating()
            this.validateMaxRating()
        })
    }

    clearMaxRating = event => {
        event.preventDefault()
        this.setState({maxRating: ''}, () => {
            this.validateMinRating()
            this.validateMaxRating()
        })
    }

    handleMinimumSizeInput = event => {
        event.preventDefault()
        let parsedInput = parseInt(event.target.value, 10)
        if (Number.isNaN(parsedInput)) {
            parsedInput = ''
        }
        this.setState({minSize: parsedInput}, () => {
            this.validateMinSize()
            this.validateMaxSize()
        })
    }

    handleMaximumSizeInput = event => {
        event.preventDefault()
        let parsedInput = parseInt(event.target.value, 10)
        if (Number.isNaN(parsedInput)) {
            parsedInput = ''
        }
        this.setState({maxSize: parsedInput}, () => {
            this.validateMinSize()
            this.validateMaxSize()
        })
    }

    clearMinSize = event => {
        event.preventDefault()
        this.setState({minSize: ''}, () => {
            this.validateMinSize()
            this.validateMaxSize()
        })
    }

    clearMaxSize = event => {
        event.preventDefault()
        this.setState({maxSize: ''}, () => {
            this.validateMinSize()
            this.validateMaxSize()
        })
    }

    clearWashrooms = () => {
        this.setState({hasWashrooms: false})
    }

    clearFacilities = () => {
        this.setState({selectedFacilities: []})
    }

    clearSpecialFeatures = () => {
        this.setState({selectedSpecialFeatures: []})
    }

    clearSelectedParkName = () => {
        this.setState({parkName: ''})
    }

    getFacilities = () => {
        if (this.props.facilities && this.props.facilities.length > 0) {
            return this.props.facilities.map((facility) => {
                return {
                    value: facility.name,
                    label: facility.name,
                }
            })
        }
        return []
    }

    getSpecialFeatures = () => {
        if (this.props.specialFeatures && this.props.specialFeatures.length > 0) {
            return this.props.specialFeatures.map((feature) => {
                return {
                    value: feature.name,
                    label: feature.name,
                }
            })
        }
        return []
    }

    validateMinRating = () => {
        if ((this.state.minRating === 0 || this.state.minRating > 0) && this.state.maxRating) {
            if (this.state.minRating > this.state.maxRating) {
                this.setState({ minRatingValid: false })
                return
            }
            if (this.state.minRating > 5) {
                this.setState({ minRatingValid: false})
                return
            }
        }
        this.setState({ minRatingValid: true })
    }

    validateMaxRating = () => {
        if ((this.state.maxRating === 0 || this.state.maxRating > 0) && this.state.minRating) {
            if (this.state.maxRating < this.state.minRating) {
                this.setState({ maxRatingValid: false})
                return
            }
            if (this.state.maxRating > 5) {
                this.setState({ maxRatingValid: false})
                return
            }
        }
        this.setState({ maxRatingValid: true })
    }

    validateMinSize = () => {
        if ((this.state.minSize === 0 || this.state.minSize > 0) && this.state.maxSize) {
            if (this.state.minSize > this.state.maxSize) {
                this.setState({ minSizeValid: false })
                return
            }
        }
        this.setState({ minSizeValid: true })
    }

    validateMaxSize = () => {
        if ((this.state.maxSize === 0 || this.state.maxSize > 0) && this.state.minSize) {
            if (this.state.maxSize < this.state.minSize) {
                this.setState({ maxSizeValid: false})
                return
            }
        }
        this.setState({ maxSizeValid: true })
    }

    handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
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

    handleSelectedPark = selectedPark => {
        this.setState({parkName: selectedPark})
    }

    handleSelectedPlace = (place) => {
        console.log(place)
        const lat = place.geometry.location.lat()
        const lon = place.geometry.location.lng()

        this.setState({lat, lon})
    }

    handleParkNameSearch = () => {
        event.preventDefault()
        this.props.saveFilterState(this.state)
        let searchParams = {
            name: this.state.parkName.label
        }

        if (searchParams.name !== '') {
            this.props.queryParks(searchParams)
        }
    }

    handleClearSearch = event => {
        event.preventDefault()
        this.props.saveFilterState({})
        this.props.resetQuery()
        this.clearMaxSize(event)
        this.clearMinSize(event)
        this.clearMaxRating(event)
        this.clearMinRating(event)
        this.clearWashrooms()
        this.clearSpecialFeatures()
        this.clearFacilities()
        this.clearSelectedParkName()
    }

    customStyles = {
        valueContainer: (provided, state) => ({
            ...provided,
            maxHeight: "2rem",
            overflow: "scroll",
        })
    }



    render() {
        const facilityOptions = this.getFacilities()
        const specialFeaturesOptions = this.getSpecialFeatures()
        const parksOptions = this.getParksOptions()

        return (
            <div className="ParkFilterToolbar">
                <form className="filterToolbar">
                    <div className="title">
                        <span>PARK FILTERS</span>
                    </div>

                    <div className="filterList">
                        <div className="filter parkSearch">
                            <label id="parkSearch" className="filter-label label-parkSearch">Select a park</label>
                            <Select
                                placeholder="Search for Park by Name"
                                id="parkSearch"
                                isMulti={false}
                                isClearable={true}
                                options={parksOptions}
                                className="multi-select"
                                value={this.state.parkName}
                                onChange={this.handleSelectedPark} />
                        </div>
                        <button
                            className="select-park"
                            onClick={this.handleParkNameSearch}>Show Park</button>
                        <span className="sectionTitle">Or, filter parks by their attributes</span>
                        <div className="filter locations-filter">
                            <div className="subFilters location-subfilters">
                                <div className="location-subfilter">
                                    <span className="filter-label">Address</span>
                                    <AddressSearchBar placeSelected={(place) => this.handleSelectedPlace(place)}/>
                                </div>
                                <div className="location-subfilter">
                                    <label id="distance" className="filter-label">Search Radius (km)</label>
                                    <input
                                        id="distance"
                                        type="number"
                                        name="radius"
                                        value={this.state.distance}
                                        onChange={this.handleDistanceInput}
                                        className="distance-input"/>
                                </div>

                            </div>
                        </div>
                        <div className="filter facilities-filter">
                            <label id="facilities" className="filter-label">Facilities</label>
                            <Select
                                placeholder="Select Facilities"
                                id="facilities"
                                isMulti={true}
                                options={facilityOptions}
                                value={this.state.selectedFacilities}
                                className="multi-select"
                                styles={this.customStyles}
                                onChange={this.handleSelectFacility} />
                        </div>
                        <div className="filter specialFeatures-filter">
                            <label id="specialFeatures" className="filter-label">Special Features</label>
                            <Select
                                placeholder="Select Special Features"
                                id="specialFeatures"
                                isMulti={true}
                                options={specialFeaturesOptions}
                                value={this.state.selectedSpecialFeatures}
                                className="multi-select"
                                styles={this.customStyles}
                                onChange={this.handleSelectSpecialFeature} />
                        </div>
                        <div className="filter washrooms-filter">
                            <label id="hasWashrooms" className="filter-label">Washrooms?</label>
                            <input
                                id="hasWashrooms"
                                type="checkbox"
                                name="washrooms"
                                checked={this.state.hasWashrooms}
                                onChange={this.handleSelectWashrooms}/>
                        </div>
                        <div className="filter rating-filters">
                            <span>Rating (out of 5)</span>
                            <div className="subFilters">
                                <div className="rating-subfilter">
                                    <label id="ratingMin" className="filter-label">Minimum</label>
                                    <div className="input-with-button">
                                        <input
                                            id="ratingMin"
                                            type="number"
                                            name="min rating"
                                            value={this.state.minRating}
                                            min="0"
                                            max="5"
                                            onKeyDown={this.handleKeyDown}
                                            onChange={this.handleMinimumRatingInput}
                                            className={`rating-input ${!this.state.minRatingValid ? 'invalid' : ''}`}/>
                                        <button
                                            className="clear-button"
                                            onClick={this.clearMinRating}>x</button>
                                    </div>
                                </div>
                                <div className="rating-subfilter">
                                    <label id="ratingMax" className="filter-label">Maximum</label>
                                    <div className="input-with-button">
                                        <input
                                            id="ratingMax"
                                            type="number"
                                            name="max rating"
                                            min="0"
                                            max="5"
                                            value={this.state.maxRating}
                                            onKeyDown={this.handleKeyDown}
                                            onChange={this.handleMaximumRatingInput}
                                            className={`rating-input ${!this.state.maxRatingValid ? 'invalid' : ''}`}/>
                                        <button
                                            className="clear-button"
                                            onClick={this.clearMaxRating}>x</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter size-filters">
                            <span>Size (hectares)</span>
                            <div className="subFilters">
                                <div className="size-subfilter">
                                    <label id="sizeMin" className="filter-label">Minimum</label>
                                    <div className="input-with-button">
                                        <input
                                            id="sizeMin"
                                            type="number"
                                            name="min size"
                                            onKeyDown={this.handleKeyDown}
                                            value={this.state.minSize}
                                            onChange={this.handleMinimumSizeInput}
                                            className={`size-input ${!this.state.minSizeValid ? 'invalid' : ''}`}/>
                                        <button
                                            className="clear-button"
                                            onClick={this.clearMinSize}>x</button>
                                    </div>
                                </div>
                                <div className="size-subfilter">
                                    <label id="sizeMax" className="filter-label">Maximum</label>
                                    <div className="input-with-button">
                                        <input
                                            id="sizeMax"
                                            type="number"
                                            name="max size"
                                            value={this.state.maxSize}
                                            onKeyDown={this.handleKeyDown}
                                            onChange={this.handleMaximumSizeInput}
                                            className={`size-input ${!this.state.maxSizeValid ? 'invalid' : ''}`}/>
                                        <button
                                            className="clear-button"
                                            onClick={this.clearMaxSize}>x</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`${this.props.loadingParks ? 'parks-loading-button' : ''} search-button`}
                            onClick={this.handleSearchSubmit}>
                            Search
                        </button>
                        <button
                            type="submit"
                            className="search-button"
                            onClick={this.handleClearSearch}>
                            Clear Search
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    queryParks: (query) => dispatch(queryParks(query)),
    resetQuery: () => dispatch(resetQuery()),
    saveFilterState: (filters) => dispatch(saveFilterState(filters))
})

const mapStateToProps = (state) => ({
    facilities: state.parks.facilities,
    specialFeatures: state.parks.specialFeatures,
    parks: state.parks.parks,
    currentFilters: state.parks.currentFilters,
    loadingParks: state.parks.loadingParks,
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkFilterToolbar)
