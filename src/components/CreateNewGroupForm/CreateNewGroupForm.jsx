import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import { Input } from '@material-ui/core';
import swal from '@sweetalert/with-react';
import Button from '@material-ui/core/Button';

//form to handle creation of a new group

class CreateNewGroupForm extends Component {
    state = {
        newGroup: {
            newGroupName: '',
            newGroupID: '',
        }
    }
    //handles change for all form properties
    handleChangeFor = (event, propertyName) => {
        this.setState({
            newGroup: {
                ...this.state.newGroup,
                [propertyName]: event.target.value,
            }
        })
    }
    //handles submission of form
    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted');
        this.setState({
            newGroup: {
                newGroupName: '',
                newGroupID: '',
            }
        })
        this.props.dispatch({
            type: 'ADD_GROUP',
            payload: {
                newGroup: this.state.newGroup,
                adminID: this.props.user.id
            }
        })
        //sweet alert to let user know group has been submitted
        swal(
            <div>
                <h1>Group submitted successfully!</h1>
            </div>
        )
    }

    render() {

        return (
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }}>
                    <form style={{ width: "75%" }} onSubmit={this.handleFormSubmit}>
                        <InputLabel htmlFor="text">Group Name</InputLabel>
                        <Input
                            value={this.state.newGroup.newGroupName}
                            onChange={(event) => this.handleChangeFor(event, 'newGroupName')} />
                        <InputLabel htmlFor="text">Group ID Number</InputLabel>
                        <Input
                            value={this.state.newGroup.newGroupID}
                            onChange={(event) => this.handleChangeFor(event, 'newGroupID')} />
                        <Button variant="contained" color="primary" type="submit" value="Add New Group">Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user
    }
}
export default connect(mapStateToProps)(CreateNewGroupForm);