import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/Select'
import { withStyles } from '@material-ui/styles';
import swal from '@sweetalert/with-react';
import Button from "@material-ui/core/Button";
import './RestaurantForm.css';

//ADD A RESTAURANT FORM
// const styles = theme => ({
//     formControl: {
//         margin: theme.spacing.unit,
//         midWidth:100
//     }
// })
class RestaurantForm extends Component {
    state = {
        newRestaurant: {
            name: '',
            type: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zip: '',
            comments: '',
            recommended: false
        }
    }
    //this handles the changes for the whole form,
    //including the radio buttons and sends to local state
    handleChangeFor = (event, propertyName) => {
        this.setState({
            newRestaurant: {
                ...this.state.newRestaurant,
                [propertyName]: event.target.value,
            }
        });
    }
    //submits new restaurant from local state to redux
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted');
        this.setState({
            newRestaurant: {
                name: '',
                type: '',
                address: '',
                city: '',
                state: '',
                country: '',
                zip: '',
                comments: '',
                recommended: true,
                photo_url: ''

            }
        })
        this.props.dispatch({
            type: 'ADD_RESTAURANT',
            payload: this.state.newRestaurant
        })
        swal(
            <div>
                <h1>Restaurant submitted successfully!</h1>
            </div>
        )}

    // handleCusineChange = (event) => {
    //     console.log('seleted cuisine is ', event.target.value)
    //     this.setState({
    //         newRestaurant = { ...newRestaurant, type: event.garget.value}
    //     })
    // }

    render() {
        const { classes } = this.props;

        return (
            <div className="background">
                <div className="formDiv">
                    <h1 className="formName">Restaurant Information</h1>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }} 
                >
                    <form style={{ width: "75%" }} className="inputForm" onSubmit={this.handleSubmit}>
                            <InputLabel htmlFor="text">Name</InputLabel>
                        <Input
                            value={this.state.newRestaurant.name}
                            onChange={(event) => this.handleChangeFor(event, 'name')} />
                            <InputLabel htmlFor="text">Address</InputLabel>
                        <Input
                            value={this.state.newRestaurant.address}
                            onChange={(event) => this.handleChangeFor(event, 'address')} />
                            <InputLabel htmlFor="text">City</InputLabel>
                        <Input
                            value={this.state.newRestaurant.city}
                            onChange={(event) => this.handleChangeFor(event, 'city')} />
                        <InputLabel htmlFor="text">State</InputLabel>
                        <Input
                            value={this.state.newRestaurant.state}
                            onChange={(event) => this.handleChangeFor(event, 'state')} />
                        <InputLabel htmlFor="text">Country</InputLabel>
                        <Input
                            value={this.state.newRestaurant.country}
                            onChange={(event) => this.handleChangeFor(event, 'country')} />
                        <InputLabel htmlFor="text">Zip</InputLabel>
                        <Input
                            value={this.state.newRestaurant.zip}
                            onChange={(event) => this.handleChangeFor(event, 'zip')} />
                        <InputLabel htmlFor="text">Comments</InputLabel>
                        <Input
                            value={this.state.newRestaurant.comments}
                            onChange={(event) => this.handleChangeFor(event, 'comments')} />
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup label="Recommended?" name="recommended" value={this.props.selectedRadio} onChange={(event) => this.handleChangeFor(event, 'recommended')}>
                                <InputLabel>
                                    Recommended
                                </InputLabel>
                                <FormControlLabel value="recommended" control={<Radio />} label="Recommended" />
                                <InputLabel>
                                    Not Recommended
                                </InputLabel>
                                <FormControlLabel value="notRecommended" control={<Radio />} label="Not Recommended" />
                            </RadioGroup>
                            <InputLabel>
                                Select cusine type:
                            </InputLabel>
                        <Select value={this.state.newRestaurant.type} onChange={(event) => this.handleChangeFor(event, 'type')}>
                            <option value="American">American</option>
                            <option value="Bbq">BBQ</option>
                            <option value="British">British</option>
                            <option value="Central American">Central American</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Ethiopian">Ethiopian</option>
                            <option value="German">German</option>
                            <option value="Greek">Greek</option>
                            <option value="Irish">Irish</option>
                            <option value="Italian">Italian</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                            <option value="Lebanese">Lebanese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Middle Eastern">Middle Eastern</option>
                            <option value="Polish">Polish</option>
                            <option value="Russian">Russian</option>
                            <option value="South American">South American</option>
                            onChange={this.handlePhotoSelect}
                        </Select>
                        <br/>
                        <br/>
                        {/* </FormControl> */}
                        <Button variant="outlined" color="primary" type="submit" value="Add Restaurant">Submit</Button>
                    </form>
                    <br />
                </div>
            </div>
        );
    }
}

export default connect()(RestaurantForm);