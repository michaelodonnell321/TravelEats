import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



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
                    <Grid container alignItems={'center'} justify={'space-evenly'} spacing={2} >
                        <Grid item xs>
                            <Button variant="outlined" onClick={() => this.handleProfileClick(this.props.user.id)}>Edit Profile</Button>
                        </Grid>
                        <Grid item xs>
                            <Box textAlign="center" fontSize="h6.fontSize">Welcome, {this.props.user.username}!
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Button variant="outlined" onClick={() => this.handleCreateGroupClick(this.props.user.id)}>Create Group</Button>
                        </Grid>
                    </Grid>
                    <span>
                        <Grid container justify={'space-between'} spacing={8} >
                            <Grid item xs>
                        <Box textAlign="center" fontSize="h6.fontSize">Your current active group is: {this.props.group[0].group_name}
                        </Box>
                            </Grid>
                        </Grid>
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