import React, { Component } from 'react';
import {connect} from 'react-redux';

//ADMIN OF GROUP VIEW

class AdminPage extends Component {

    componentDidMount() {
        // this.getAdminGroupInfo()
    }

    getAdminGroupInfo = () => {
        this.props.dispatch({
            type: 'GET_ADMIN_GROUP_INFO',
            payload: this.props.user.active_group_id
        })
    }

    render() {
        
        return (
            <div>
                <div>
                    <h1>Admin</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
    }
}
export default connect(mapStateToProps)(AdminPage);