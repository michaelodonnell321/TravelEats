import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import GroupGenerator from '../GroupGenerator/GroupGenerator';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
//PROFILE EDIT VIEW
const styles = {
    joinGroup: {
        padding: '10px',
    }
}

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

    handleAdminClick = (id) => {
        this.props.dispatch({
            type: 'GET_ADMIN_GROUP_INFO',
            payload: id
        })
        this.props.history.push(`/admin/${id}`)
    }
    render() {
        return (
            <div>
                <Typography component="div">
                    <Box textAlign="center" fontSize="h3.fontSize" className="formName">Edit Profile Information
                    </Box>
                </Typography>
                <Button onClick={this.backClick} variant="outlined">Back</Button>
                <Button onClick={() => this.handleAdminClick(this.props.user.active_group_id)} variant="outlined">Admin</Button>
                <EditProfileForm />
                <Typography component="div">
                    <Box textAlign="center" fontSize="h6.fontSize" className="formText">
                        Join a group by entering the Group Number
                    provided to you by the Group Admin here:
                    </Box>
                </Typography>
                <br />
                <Container className={this.props.classes.joinGroup}>
                    <Input placeholder="group number" />
                    <br />
                    <br />
                    <Button variant="outlined">Join</Button>
                
                <p>Current Active Group: {this.props.profile[0].group_name}</p>
                <p>Select group to view:</p>
                {<GroupGenerator />}
                </Container>
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

export default connect(mapStateToProps)(withStyles(styles)(EditProfile));