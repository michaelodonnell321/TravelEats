import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import GroupGenerator from '../GroupGenerator/GroupGenerator';
//PROFILE EDIT VIEW

class EditProfile extends Component {

    componentDidMount() {
        console.log('props are', this.props)
        this.getGroups();
        this.getActiveGroup();
    }

    getActiveGroup = () => {
        this.props.dispatch({
            type: 'FETCH_ACTIVE_GROUP',
            payload: this.props.user.id
        })
    }

    getGroups = () => {
        this.props.dispatch({
            type: 'FETCH_ALL_GROUPS'
        })
    }
    backClick = () => {
        this.props.history.push('/list')
    }

    render() {
        return (
            <div>
                <h1>Edit Profile</h1>
                <Button onClick={this.backClick} variant="outlined">Back</Button>
                <Button variant="outlined">Admin</Button>
                <EditProfileForm />
                    Join a group by entering the Group Number
                    provided to you by the Group Admin here:
                <Input placeholder="group number" />
                <Button variant="outlined">Submit</Button>
                <p>Current Active Group: {this.props.profile[0].group_name}</p>
                <p>Select group to view:</p>
                {<GroupGenerator />}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore,
        group: reduxStore.groupReducer,
        user: reduxStore.user,
        profile: reduxStore.profilePageReducer
    }
}

export default connect(mapStateToProps)(EditProfile);