import React from 'react'
import {  GoogleApiWrapper } from 'google-maps-react'

class AddressSearchBar extends React.Component {
    constructor (props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            googleAutoComplete: null,
            options: {}
        }

    }

    options = (google) => {
        const sw = {
            lat: 49.030120,
            lng: -123.521999
        }
        const ne = {
            lat: 49.355446,
            lng: -122.674714
        }
        const location = new google.maps.LatLngBounds(sw, ne)

        return {
            bounds: location,
            strictbounds: true,
            fields: ['geometry.location', 'formatted_address']
        }
    }

    handlePlaceSelect = autocomplete => {
        const place = autocomplete.getPlace()
        this.props.placeSelected(place)
    }

    handleChange = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log(event.target.value)
        }
        if (event.key === 'Backspace') {
            this.props.placeDeleted()
        }
    }

    createRef = event => {
        if (event) {
            if (!this.state.googleAutoComplete) {
                const options = this.options(this.props.google)
                const autocomplete = new this.props.google.maps.places.Autocomplete(event, options)
                autocomplete.addListener("place_changed", () => {
                    this.handlePlaceSelect(autocomplete)
                })
                this.setState({options: options, googleAutocomplete: autocomplete})
            }
        }
    }

    render () {
        return (
            <input
                defaultValue={this.props.formattedPlaceString}
                onChange={this.handleChange}
                onKeyDown={this.handleChange}
                ref={this.createRef} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(AddressSearchBar)
