import React from 'react'
import {  GoogleApiWrapper } from 'google-maps-react'

class AddressSearchBar extends React.Component {
    constructor (props) {
        super(props)
        this.inputRef = React.createRef()
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
        console.log(autocomplete)
        const place = autocomplete.getPlace()
        const prediciton = autocomplete.getPlacePredictions()
        console.log(prediciton)
        this.props.placeSelected(place)
    }

    handleChange = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log(event.target.value)
        }
    }

    render () {
        if (this.inputRef.current !== null) {
            const google = this.props.google
            const options = this.options(google)
            const googleAutocomplete = new google.maps.places.Autocomplete(this.inputRef.current, options)
            googleAutocomplete.addListener("place_changed", () => {
                this.handlePlaceSelect(googleAutocomplete)
            })
        }
        return (
            <input onChange={this.handleChange} onKeyDown={this.handleChange} ref={this.inputRef} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(AddressSearchBar)
