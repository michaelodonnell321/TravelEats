import React, { Component } from 'react';
import {connect} from 'react-redux';

//creates CLOSED text on details page when restaurant is marked closed

class ClosedText extends Component {
    render() {
        return (
            <div>
                {this.props.details[0].closed &&
                <h1>CLOSED</h1>}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        details: reduxStore.detailsReducer
    }
}
export default connect(mapStateToProps)(ClosedText);