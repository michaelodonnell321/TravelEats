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
                country: '',
                zip: '',
                comments: '',
                recommended: ''

            }
        })
        this.props.dispatch({
            type: 'ADD_RESTAURANT',
            payload: this.state.newRestaurant
        })
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <h1>Restaurant Information</h1>
                </div>
                <div className="restaurantForm">
                    <form className="inputForm" onSubmit={this.handleSubmit}>
                        {/* <FormControl> */}
                            <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            // placeholder="name"
                            onChange={(event) => this.handleChangeFor(event, 'name')} />
                        <Input
                            placeholder="type of restaurant"
                            onChange={(event) => this.handleChangeFor(event, 'type')} />
                        <Input
                            placeholder="address"
                            onChange={(event) => this.handleChangeFor(event, 'address')} />
                        <Input
                            placeholder="city"
                            onChange={(event) => this.handleChangeFor(event, 'city')} />
                        <Input
                            placeholder="state"
                            onChange={(event) => this.handleChangeFor(event, 'state')} />
                        <Input
                            placeholder="country"
                            onChange={(event) => this.handleChangeFor(event, 'country')} />
                        <Input
                            placeholder="zip"
                            onChange={(event) => this.handleChangeFor(event, 'zip')} />
                        <Input
                            placeholder="comments"
                            onChange={(event) => this.handleChangeFor(event, 'comments')} />
                            <FormLabel component="legend">Recommended?</FormLabel>
                            <RadioGroup label="Recommended?" name="recommended" value={this.props.selectedRadio} onChange={(event) => this.handleChangeFor(event, 'recommended')}>
                                <FormControlLabel value="recommended" control={<Radio />} label="Recommended" />
                                <FormControlLabel value="notRecommended" control={<Radio />} label="Not Recommended" />
                            </RadioGroup>
                        {/* </FormControl> */}
                        <input type="submit" value="Add Restaurant" />
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(RestaurantForm);