import React from "react";
import { connect } from "react-redux";
import { filterParks } from 'features/parks/parksSlice'

class Searchbar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            searchQuery: "",
            invalidSearch: false,
            searchResult: null,
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.clearSearchText = this.clearSearchText.bind(this);
        this.searchForAPark = this.searchForAPark.bind(this);
    }


    handleSearchInput(event) {
        this.setState({
            searchQuery: event.target.value
        })

    };

    handleSearchSubmit(event) {

        event.preventDefault();

        if (this.state.searchQuery === "") {
            // TODO: add error message
            this.setState({
                invalidSearch: true
            });
        } else {
            this.searchForAPark(this.state.searchQuery);

            //TODO: call whatever method we pass in and use this.state.searchQuery as the parameter
            this.setState({
                invalidSearch: false
            })

            this.clearSearchText();
        }
    };

    searchForAPark = (parkName) =>  {
        this.props.setFilter(parkName)
        this.props.onSearch(false)
    }

    clearSearchText() {
        this.setState({
            searchQuery: ""
        })
    }

    render() {

        //TODO: move all styling to CSS or whatever we chose to do

        return <form onSubmit={this.handleSearchSubmit}>
            <input placeholder={this.props.placeholder}
                   onChange={this.handleSearchInput}
                   value={this.state.searchQuery}
                   name="search"/>
            <button type="submit" onClick={this.handleSearchSubmit}>
                <i className="fa fa-search"/>
            </button>
            {
                this.state.invalidSearch ?
                    <div>
                        There is something wrong with your search. Try again!
                    </div>
                    : null
            }
            {
                this.state.searchResult != null ?
                    <div>
                        <div>
                            Name: {this.state.searchResult.parkName}
                        </div>
                        <div>
                            Lat: {this.state.searchResult.lat}
                        </div>
                        <div>
                            Lon: {this.state.searchResult.lng}
                        </div>
                        Events:
                        {
                            this.state.searchResult.events.map((event) => {
                                return <div key={event.eventTime}>
                                    <div>
                                        {event.parkName}
                                    </div>
                                    <div>
                                        {event.eventTime}
                                    </div>
                                </div>;
                            })
                        }

                    </div>
                    :
                    null
            }
            {
                this.state.searchResult === undefined ?

                    <div>
                        There are no results
                    </div>
                    :
                    null
            }
        </form>

    }
}
const mapDispatchToProps = (dispatch) => ({
    setFilter: (filter) => dispatch(filterParks(filter))
})

const mapStateToProps = (state) => ({
    filteredParks: state.parks.filteredParks
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
