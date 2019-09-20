import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Select } from '@material-ui/core';
import swal from '@sweetalert/with-react';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './RestaurantForm.css';
import Container from '@material-ui/core/Container';

const styles = {
    background: {
        backgroundImage: "url('/images/formbackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: "100%",
    },
    addForm: {
        padding: '10px',
        backgroundColor: '#ffa726',
        opacity: '0.9',
        color: 'black'
    },
    radioValues: {
        color: 'black',
    }
}

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
            recommended: true,
            type: 'American'
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

        this.props.dispatch({
            type: 'ADD_RESTAURANT',
            payload: this.state.newRestaurant
        })

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
        swal(
            <div>
                <h1>Restaurant submitted successfully!</h1>
            </div >
        )
    }

    demoClick = () => {
        this.setState({
            newRestaurant: {
                name: 'The Handsome Hog',
                address: '203 6th St E',
                city: 'St Paul',
                state: 'MN',
                country: 'United States',
                zip: '55101',
                comments: 'Incredible BBQ, great atmosphere. Bourbon and smoke, what more could you need?',
                recommended: true,
                type: 'BBQ'
            }
        })
    }

    render() {

        return (
            <Container className={this.props.classes.background}>
                <div className="formDiv">
                    <Typography component="div">
                        <Box onClick={this.demoClick()} textAlign="center" fontSize="h3.fontSize" className="formName">Add a Restaurant
                    </Box>
                    </Typography>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }}
                >
                    <form style={{ width: "75%" }} className={this.props.classes.addForm} onSubmit={this.handleSubmit}>
                        <InputLabel htmlFor="text">Name</InputLabel>
                        <Input
                            required
                            label="name"
                            value={this.state.newRestaurant.name}
                            onChange={(event) => this.handleChangeFor(event, 'name')} />
                        <InputLabel htmlFor="text">Address</InputLabel>
                        <Input
                            required
                            value={this.state.newRestaurant.address}
                            onChange={(event) => this.handleChangeFor(event, 'address')} />
                        <InputLabel htmlFor="text">City</InputLabel>
                        <Input
                            required
                            value={this.state.newRestaurant.city}
                            onChange={(event) => this.handleChangeFor(event, 'city')} />
                        <InputLabel htmlFor="text">State</InputLabel>
                        <Input
                            required
                            value={this.state.newRestaurant.state}
                            onChange={(event) => this.handleChangeFor(event, 'state')} />
                        <InputLabel htmlFor="text">Country</InputLabel>
                        <Input
                            required
                            value={this.state.newRestaurant.country}
                            onChange={(event) => this.handleChangeFor(event, 'country')} />
                        <InputLabel htmlFor="text">Zip</InputLabel>
                        <Input
                            required
                            value={this.state.newRestaurant.zip}
                            onChange={(event) => this.handleChangeFor(event, 'zip')} />
                        <InputLabel htmlFor="text">Comments</InputLabel>
                        <Input
                            required
                            multiline
                            value={this.state.newRestaurant.comments}
                            onChange={(event) => this.handleChangeFor(event, 'comments')} />
                        <FormLabel component="legend"></FormLabel>
                        <RadioGroup label="Recommended?" name="recommended" value={this.props.selectedRadio} onChange={(event) => this.handleChangeFor(event, 'recommended')}>
                            <FormControlLabel className={this.props.classes.radioValues} value="recommended" control={<Radio />} label="Recommended" />
                            <FormControlLabel className={this.props.classes.radioValues} value="notRecommended" control={<Radio />} label="Not Recommended" />
                        </RadioGroup>
                        <InputLabel>
                            Select cusine type:
                            </InputLabel>
                        <Select required value={this.state.newRestaurant.type} onChange={(event) => this.handleChangeFor(event, 'type')}>
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
                        <br />
                        <br />
                        {/* </FormControl> */}
                        <Button variant="outlined" color="primary" type="submit" value="Add Restaurant">Submit</Button>
                    </form>
                    <br />
                </div>
            </Container >
        );
    }
}

export default connect()(withStyles(styles)(RestaurantForm));