import React, { Component } from 'react';
import {connect} from 'react-redux';

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