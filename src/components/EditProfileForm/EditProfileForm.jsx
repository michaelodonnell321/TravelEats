import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


class EditProfileForm extends Component {
    render() {
        return (
            <div>
                <p>Edit Profile Information</p>
                <br />
                <Input placeholder="email address" />
                <Button variant="outlined">Submit</Button>
                <Input placeholder="name" />
                <Button variant="outlined">Submit</Button>
                <Input placeholder="location" />
                <Button variant="outlined">Submit</Button>
            </div>
        );
    }
}

export default connect()(EditProfileForm);