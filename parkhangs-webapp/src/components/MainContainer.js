import React from 'react';
import { connect } from 'react-redux';
//import {increment} from '../actions';

class MainContainer extends React.Component {
    render () {
        return (
                <div>
                    <h1>Page Content goes here.</h1>
                    <button onClick={()=>{alert(this.props.selected + " is selected!")}}>Selected Park</button>
                </div>
        );
    }
}

const mapStateToProps = (state) => { //name is by convention
  return { selected: state.parks.selectedPark }; //now it will appear as props
}

export default connect(mapStateToProps, null)(MainContainer);
// export default MainContainer;
