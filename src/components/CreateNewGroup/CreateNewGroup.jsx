import React, { Component } from 'react';
import {connect} from 'react-redux';
import CreateNewGroupForm from '../CreateNewGroupForm/CreateNewGroupForm';

class CreateNewGroup extends Component {
    render() {
        return (
            <div>
                <h1>Create New Group</h1>
                <CreateNewGroupForm />
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}
export default connect(mapStateToProps)(CreateNewGroup);