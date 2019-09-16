import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

//PROFILE EDIT VIEW

class EditProfile extends Component {
    render() {
        return (
            <div>
                <h1>Edit Profile</h1>
                <Button variant="outlined">Back</Button>
                <Button variant="outlined">Admin</Button>
                <p>Edit Profile Information</p>
                <br />
                <Input placeholder="email address" />
                <Button variant="outlined">Submit</Button>
                <Input placeholder="name" />
                <Button variant="outlined">Submit</Button>
                <Input placeholder="location" />
                <Button variant="outlined">Submit</Button>
                <p>
                    Request to join a group by entering the Group Number
                    provided to you by the Group Admin here:
                </p>
                <Input placeholder="group number" />
                <Button variant="outlined">Submit</Button>
                <p>Select group to view:</p>
                {/* MAP ON REDUCER OF GROUPS HERE */}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(EditProfile);