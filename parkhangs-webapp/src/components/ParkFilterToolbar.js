import React from 'react'
import { connect } from 'react-redux'
import { queryParks } from 'features/parks/parksSlice'
import Select from 'react-select'
import { cloneDeep } from 'lodash'

class ParkFilterToolbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFacilities: [],
            selectedSpecialFeatures: [],
            hasWashrooms: false,
            minRating: undefined,
            maxRating: undefined,
            minSize: undefined,
            maxSize: undefined,
        }
    }

    handleSearchSubmit = event => {
        event.preventDefault()
        let searchParams = {
            hasWashrooms: this.state.hasWashrooms,
            facilities: this.state.selectedFacilities,
            specialFeatures: this.state.selectedSpecialFeatures,
            sizeGte: this.state.minSize,
            sizeLte: this.state.maxSize,
            ratingGte: this.state.minRating,
            ratingLte: this.state.maxRating,
        }

        searchParams = this.pruneSearchParams(searchParams)
        console.log(searchParams)
        console.log('submit!')
        if (Object.keys(searchParams).length > 0) {
            this.props.queryParks(searchParams)
        }
    }

    pruneSearchParams = (searchParams) => {
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

    handleSelectFacility = (selectedFacilities) => {
        const selected = selectedFacilities.map(facility => facility.value)
        this.setState({selectedFacilities: selected})
    }

    handleSelectSpecialFeature = (selectedSpecialFeatures) => {
        const selected = selectedSpecialFeatures.map(featureOption => featureOption.value)
        this.setState({selectedSpecialFeatures: selected})
    }

    handleSelectWashrooms = (event) => {
        const selected = this.state.hasWashrooms
        this.setState({hasWashrooms: !selected})
    }

    handleMinimumRatingInput = (event) => {
        event.preventDefault
        this.setState({minRating: event.target.value})
    }

    handleMaximumRatingInput = (event) => {
        event.preventDefault
        this.setState({maxRating: event.target.value})}

    clearMinRating = event => {
        event.preventDefault()
        this.setState({minRating: undefined})
    }

    clearMaxRating = event => {
        event.preventDefault()
        this.setState({maxRating: undefined})
    }

    handleMinimumSizeInput = (event) => {
        event.preventDefault
        this.setState({minSize: event.target.value})
    }

    handleMaximumSizeInput = (event) => {
        event.preventDefault
        this.setState({maxSize: event.target.value})}

    clearMinSize = event => {
        event.preventDefault()
        this.setState({minSize: undefined})
    }

    clearMaxSize = event => {
        event.preventDefault()
        this.setState({maxSize: undefined})
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

    render() {
        const facilityOptions = this.getFacilities()
        const specialFeaturesOptions = this.getSpecialFeatures()

        return (
            <form onSubmit={this.handleSearchSubmit}>
                <div>Select a specific park</div>
                <div>Or, filter parks by parameters</div>
                <div>
                    <label id="facilities">Facilities</label>
                    <Select
                        id="facilities"
                        isMulti={true}
                        options={facilityOptions}
                        onChange={this.handleSelectFacility} />
                </div>
                <div>
                    <label id="specialFeatures">Special Features</label>
                    <Select
                        id="specialFeatures"
                        isMulti={true}
                        options={specialFeaturesOptions}
                        onChange={this.handleSelectSpecialFeature} />
                </div>
                <div>
                    <label id="hasWashrooms">Washrooms?</label>
                    <input
                        id="hasWashrooms"
                        type="checkbox"
                        name="washrooms"
                        onChange={this.handleSelectWashrooms}/>
                </div>
                <div>
                    <label id="ratingMin">Minimum rating</label>
                    <input
                        id="ratingMin"
                        type="number"
                        name="min rating"
                        onChange={this.handleMinimumRatingInput}/>
                    <button onClick={this.clearMinRating}>x</button>
                    <label id="ratingMax">Maximum rating</label>
                    <input
                        id="ratingMax"
                        type="number"
                        name="max rating"
                        onChange={this.handleMaximumRatingInput}/>
                    <button onClick={this.clearMaxRating}>x</button>
                </div>
                <div>
                    <label id="sizeMin">Minimum size (hectares)</label>
                    <input
                        id="sizeMin"
                        type="number"
                        name="min size"
                        onChange={this.handleMinimumSizeInput}/>
                    <button onClick={this.clearMinRating}>x</button>
                    <label id="sizeMax">Maximum size (hectares)</label>
                    <input
                        id="sizeMax"
                        type="number"
                        name="max size"
                        onChange={this.handleMaximumSizeInput}/>
                    <button onClick={this.clearMaxRating}>x</button>
                </div>
                <button
                    type="submit"
                    onClick={this.handleSearchSubmit}>Search</button>
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
    specialFeatures: state.parks.specialFeatures,
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkFilterToolbar)
