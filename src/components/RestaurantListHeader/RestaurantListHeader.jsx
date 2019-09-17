import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

class EditProfileHeader extends Component {

    componentDidMount() {
        this.getGroupName();
    }

    getGroupName = () => {
        this.props.dispatch({
            type: 'GET_GROUP',
            payload: this.props.user.id
        })
    }

    handleProfileClick = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    handleCreateGroupClick = (id) => {
        this.props.history.push(`/create_group`)
    }

    render() {

        
        return (
            <div>
                <div>
                    <span>
                        <Button onClick={() => this.handleProfileClick(this.props.user.id)}>Edit Profile</Button>
                    </span>
                    <span>
                        <h1>Welcome, {this.props.user.username}!</h1>
                    </span>
                    <span>
                        <Button onClick={() => this.handleCreateGroupClick(this.props.user.id)}>Create New Group</Button>
                    </span>
                    <span>
                        <h2>Your current active group is: {this.props.profile[0].group_name}</h2>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore,
        user: reduxStore.user,
        group: reduxStore.groupReducer,
        profile: reduxStore.profilePageReducer,
    }
}
export default connect(mapStateToProps)(withRouter(EditProfileHeader));