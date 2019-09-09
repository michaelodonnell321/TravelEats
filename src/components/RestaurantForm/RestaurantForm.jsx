import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

//ADD A RESTAURANT FORM

class RestaurantForm extends Component {
    state = {
        selectedRadio: false,
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

    handleRadioChange = (event) => {
        this.setState({
            selectedRadio: !this.state.newRestaurant.recommended
        })
    }

    handleChangeFor = (event, propertyName) => {
        this.setState({
            newRestaurant: {
                ...this.state.newRestaurant,
                [propertyName]: event.target.value,
            }
        });
    }

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
        console.log(this.state.newRestaurant.recommended);
        return (
            <div>
            <div>
                <h1>Restaurant Information</h1>
            </div>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="name"
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
                    <label>
                        <FormLabel component="legend">Recommended?</FormLabel>
                            <RadioGroup label="Recommended?" name="recommended" value={this.props.selectedRadio} onChange={(event) => this.handleChangeFor(event, 'recommended')}>
                        <FormControlLabel value="recommended" control={<Radio />} label="recommended" />
                        <FormControlLabel value="notRecommended" control={<Radio />} label="not recommended" />
                        </RadioGroup>
                    </label>
                    <input type="submit" value="Add Restaurant" />
                </form>
            </div>
            </div>
        );
    }
}

export default connect()(RestaurantForm);