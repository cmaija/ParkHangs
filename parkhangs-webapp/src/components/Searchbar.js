import * as React from "react";
import connect from "react-redux/es/connect/connect";

class Searchbar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            searchQuery: ""
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.clearSearchText = this.clearSearchText.bind(this);
    }


    handleSearchInput(event) {

        this.setState({
            searchQuery: event.target.value.trim()
        });

    };

    handleSearchSubmit(event) {

        event.preventDefault();

        if (this.state.searchQuery === "") {

            // TODO: add error message

            alert("You didn't search anything!!");

        } else {

            alert("You searched: " + this.state.searchQuery);

            //TODO: call whatever method we pass in and use this.state.searchQuery as the parameter

            this.clearSearchText();
        }
    };

    clearSearchText() {
        this.setState({
            searchQuery: ""
        });
    }

    render() {

        //TODO: move all styling to CSS or whatever we chose to do

        return <form onSubmit={this.handleSearchSubmit}>
            <input placeholder={this.props.placeholder}
                   onChange={this.handleSearchInput}
                   value={this.state.searchQuery}
                   name="search"/>
            <button type="submit" onClick={this.handleSearchSubmit}>
                <i className="fa fa-search">
                </i>
            </button>

        </form>

    }
}


const mapStateToProps = (state) => {
    //TODO: set props here from state
};


const mapDispatchToProps = (dispatch) => ({
    //TODO: add actions here

});


export default Searchbar;

// export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);




