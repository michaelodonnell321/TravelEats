import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

class EditProfileForm extends Component {

    state = {
        updatedUserInfo: {
            email: '',
            name: '',
            location: '',
        },
        currentUserInfo: {
            email: this.props.profileInfo[0].email,
            name: this.props.profileInfo[0].name,
            location: this.props.profileInfo[0].location
        }
    }

    componentDidMount() {
        this.getProfileInfo();
        console.log('state is', this.state)
    }

    getProfileInfo = () => {
        this.props.dispatch({
            type: 'GET_PROFILE_INFO',
            payload: this.props.user.id
        })
        this.setState({
            currentUserInfo: {
                email: this.props.profileInfo.email,
                name: this.props.profileInfo.name,
                location: this.props.profileInfo.location
            }
        })
        console.log('state after get profile info', this.state)
    }

    handleChangeFor = (event, propertyName) => {
        this.setState({
            updatedUserInfo: {
                ...this.state.updatedUserInfo,
                [propertyName]: event.target.value,
            }
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted');
        this.props.dispatch({
            type: 'UPDATE_USER_INFO',
            payload: {
                updatedUserInfo: this.state.updatedUserInfo,
                userId: this.props.user.id
            }
        })
        this.getProfileInfo();
    }

    render() {
        return (
            <div>
                <p>Edit Profile Information</p>
                <br />
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <InputLabel htmlFor="text">Email Address</InputLabel>
                        <Input
                            value={this.state.currentUserInfo.email}
                            onChange={(event) => this.handleChangeFor(event, 'email')} />
                        <InputLabel htmlFor="text">Name</InputLabel>
                        <Input
                            value={this.state.currentUserInfo.name}
                            onChange={(event) => this.handleChangeFor(event, 'name')} />
                        <InputLabel htmlFor="text">Location</InputLabel>
                        <Input
                            value={this.state.currentUserInfo.location}
                            onChange={(event) => this.handleChangeFor(event, 'location')} />
                        <Button variant="outlined" type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        profileInfo: reduxStore.profileUserInfo
    }
}

export default connect(mapStateToProps)(EditProfileForm);